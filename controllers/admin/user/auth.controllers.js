const { prisma } = require('@/configs/prisma');
const authService = require('@/services/auth.service');

const { badRequestResponse, okResponse } = require('@/constants/responses');

const { unixTimeInMinutes } = require('@/services/time.service');

const sendResetPasswordEmail = require('@/emails/email-resetPassword');
const sendEmailVerificationOtp = require('@/emails/email-verification');
const notifyNewAdminEmail = require('../../../emails/email-newAdmin');

const emailVerification = process.env.EMAIL_VERIFICATION;
const passwordReset = process.env.PASSWORD_RESET;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.admins.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
        role: true,
      },
    });

    if (!user) {
      const response = badRequestResponse('Invalid credentials.');
      return res.status(response.status.code).json(response);
    }

    if (user.password !== password) {
      const response = badRequestResponse('Invalid credentials.');
      return res.status(response.status.code).json(response);
    }

    const token = authService.createToken({ userId: user.id, role: user.role });

    const response = okResponse({ token }, 'Successfully logged in.');
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

const addNewAdmin = async (req, res, next) => {
  const {
    email, password, username, role,
  } = req.body;
  try {
    const existingUser = await prisma.admins.findUnique({
      where: { email },
    });

    if (existingUser) {
      await prisma.admins.update({
        where: {
          email,
        },
        data: {
          password,
          username,
          role,
        },
      });
    } else {
      await prisma.admins.create({
        data: {
          ...req.body,
        },
      });
    }

    notifyNewAdminEmail(req.body);

    const response = okResponse(null, 'Email sent.');
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  const { password } = req.body;
  const { userId, otpVerified, type } = req.user;

  try {
    if (!otpVerified || type !== passwordReset) {
      const response = badRequestResponse('Otp not verified.');
      return res.status(response.status.code).json(response);
    }

    const hashedPassword = await authService.hashPassword(password);

    await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        authentication: {
          update: {
            password: hashedPassword,
          },
        },
      },
    });

    const response = okResponse(null, 'Password updated.');
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

const generateOtp = async (req, res, next) => {
  const { type } = req.params;
  const { email } = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        authentication: {
          select: {
            isEmailVerified: true,
          },
        },
      },
    });

    if (!user) {
      const response = badRequestResponse('Could not find user.');
      return res.status(response.status.code).json(response);
    }

    const otp = authService.generateOTP();

    // otp for verifying email
    if (type === 'emailVerification') {
      if (user.authentication.isEmailVerified) {
        const response = badRequestResponse('Email already verified.');
        return res.status(response.status.code).json(response);
      }

      await prisma.authentication.update({
        where: {
          userId: user.id,
        },
        data: {
          emailOtp: otp,
        },
      });

      await sendEmailVerificationOtp(email, otp);

      const verificationToken = authService.createToken({ userId: user.id, type: emailVerification });

      const response = okResponse({ token: verificationToken }, 'Otp has been sent on email.');
      return res.status(response.status.code).json(response);
    }

    // otp for password reset
    if (type === 'resetPassword') {
      if (!user.authentication.isEmailVerified) {
        const response = badRequestResponse('Email not verified.');
        return res.status(response.status.code).json(response);
      }

      await prisma.authentication.update({
        where: {
          userId: user.id,
        },
        data: {
          emailOtp: otp,
        },
      });

      await sendResetPasswordEmail(email, otp);

      const resetToken = authService.createToken({ userId: user.id, type: passwordReset });

      const response = okResponse({ token: resetToken }, 'Otp has been sent on email.');
      return res.status(response.status.code).json(response);
    }
  } catch (error) {
    next(error);
  }
};

const verifyOtp = async (req, res, next) => {
  const { otp } = req.body;
  const { userId, type } = req.user;
  try {
    const user = await prisma.authentication.findUnique({
      where: {
        userId,
      },
      select: {
        userId: true,
        emailOtp: true,
        isEmailVerified: true,
        updatedAt: true,
      },
    });

    if (!user) {
      const response = badRequestResponse('Invalid token.');
      return res.status(response.status.code).json(response);
    }

    if (type === passwordReset && !user.isEmailVerified) {
      const response = badRequestResponse('Email not verified.');
      return res.status(response.status.code).json(response);
    }

    // otp is valid for 15 minutes
    if (unixTimeInMinutes(Date.now()) - unixTimeInMinutes(user.updatedAt) > 15) {
      const response = badRequestResponse('OTP has expired.');
      return res.status(response.status.code).json(response);
    }

    if (user.emailOtp !== otp) {
      const response = badRequestResponse('Invalid otp.');
      return res.status(response.status.code).json(response);
    }

    const token = authService.createToken({ userId: user.userId, otpVerified: true, type });

    const response = okResponse({ token }, 'Otp verified.');
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  login,
  addNewAdmin,
  resetPassword,
  generateOtp,
  verifyOtp,
};
