const transporter = require('@/configs/email');
const { logger } = require('../configs/logger');

const sendEmailVerificationOtp = async (email, otp) => {
  const mailOptions = {
    to: email,
    subject: 'Email Verification',
    html: `<p>Please enter OTP to verify your email:</p>
               <h2>${otp}</h2>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.response}`);
  } catch (error) {
    logger.error(error);
    throw new Error('Error sending verification email');
  }
};

module.exports = sendEmailVerificationOtp;
