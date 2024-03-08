const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../configs/prisma');

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const otpJWTSecretKey = process.env.OTP_JWT_SECRET_KEY;

const createToken = (params) => {
  const token = jwt.sign({ ...params }, jwtSecretKey);

  return token;
};

const createOtpToken = (params) => {
  const token = jwt.sign({ ...params }, otpJWTSecretKey);

  return token;
};

const verifyAndDecodeToken = (token) => {
  const result = jwt.verify(token, jwtSecretKey, (err, decodedData) => {
    if (err) {
      return { tokenValid: false };
    }
    return { tokenValid: true, decodedData };
  });
  return result;
};

const verifyAndDecodeOTPToken = (token) => {
  const result = jwt.verify(token, otpJWTSecretKey, (err, decodedData) => {
    if (err) {
      return { tokenValid: false };
    }
    return { tokenValid: true, decodedData };
  });
  return result;
};

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const comparePasswords = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

const generateOTP = (length = 6) => {
  const otp = Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
  return otp;
};

const generateRandomAlphanumericCode = (codeLength = 11) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';

  for (let i = 0; i < codeLength; i + 1) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
};

const googleLogin = async (name, email, picture) => {
  const user = await prisma.users.findUnique({
    where: { email },
    select: {
      id: true,
      authentication: {
        select: {
          isEmailVerified: true,
        },
      },
    },
  });

  // user exists and email is verified
  if (user && user.authentication.isEmailVerified) {
    const token = createToken({ userId: user.id });
    return token;
  }

  // user exists but email is not verified
  if (user && !user.authentication.isEmailVerified) {
    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        picture,
        authentication: {
          update: {
            data: {
              isEmailVerified: true,
              provider: 'google',
            },
            where: {
              userId: user.id,
            },
          },
        },
      },
    });

    const token = createToken({ userId: user.id });
    return token;
  }

  // if user does not exist
  const newUser = await prisma.users.create({
    data: {
      name,
      email,
      picture,
      authentication: {
        create: {
          provider: 'google',
          isEmailVerified: true,
        },
      },
    },
    select: {
      id: true,
    },
  });

  const token = createToken({ userId: newUser.id });
  return token;
};
module.exports = {
  createToken,
  createOtpToken,
  verifyAndDecodeToken,
  verifyAndDecodeOTPToken,
  comparePasswords,
  hashPassword,
  generateOTP,
  generateRandomAlphanumericCode,
  googleLogin,
};
