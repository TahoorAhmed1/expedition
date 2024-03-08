const { prisma } = require('@/configs/prisma');
const authService = require('@/services/auth.service');

const { okResponse, updateSuccessResponse, badRequestResponse } = require('@/constants/responses');

const emailVerification = process.env.EMAIL_VERIFICATION;

const getBio = async (req, res, next) => {
  const { userId } = req.user;
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        picture: true,
        authentication: {
          select: {
            isEmailVerified: true,
          },
        },
        subscriptions: {
          select: {
            subscriptionId: true,
            amount: true,
          },
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    const donations = await prisma.donations.aggregate({
      where: {
        userId,
      },
      _sum: {
        amount: true,
      },
      _count: {
        userId: true,
      },
    });

    const response = okResponse({ ...user, donations: { count: donations._count.userId, amount: donations._sum.amount } });
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

const updateBio = async (req, res, next) => {
  const { userId } = req.user;
  const { firstName, lastName, picture } = req.body;
  try {
    const user = await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        firstName,
        lastName,
        picture,
      },
    });

    if (!user) {
      const response = badRequestResponse('User not found.');
      return res.status(response.status.code).json(response);
    }

    const response = updateSuccessResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  const { userId, otpVerified, type } = req.user;
  try {
    if (!otpVerified || type !== emailVerification) {
      const response = badRequestResponse('Otp not verified.');
      return res.status(response.status.code).json(response);
    }

    const user = await prisma.users.findUnique({
      where: {
        id: userId,
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

    if (user.authentication.isEmailVerified) {
      const response = badRequestResponse('Email is already verified.');
      return res.status(response.status.code).json(response);
    }

    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        authentication: {
          update: {
            data: {
              isEmailVerified: true,
            },
            where: {
              userId: user.id,
            },
          },
        },
      },
    });

    const response = okResponse(null, 'Email has been verified.');
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { userId } = req.user;
  try {
    if (oldPassword === newPassword) {
      const response = badRequestResponse('New password cannot be same as old password.');
      return res.status(response.status.code).json(response);
    }

    const user = await prisma.authentication.findUnique({
      where: {
        userId,
      },
      select: {
        password: true,
      },
    });

    if (user.password) {
      const doPasswordsMatch = await authService.comparePasswords(oldPassword, user.password);

      if (!doPasswordsMatch) {
        const response = badRequestResponse('Incorrect old password.');
        return res.status(response.status.code).json(response);
      }
    }

    const newHashedPassword = await authService.hashPassword(newPassword);

    await prisma.authentication.update({
      where: {
        userId,
      },
      data: {
        password: newHashedPassword,
      },
    });

    const response = updateSuccessResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBio,
  updateBio,
  verifyEmail,
  updatePassword,
};
