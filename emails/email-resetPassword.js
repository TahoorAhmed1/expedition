const transporter = require('@/configs/email');
const { logger } = require('../configs/logger');

const sendResetPasswordEmail = async (email, otp) => {
  const mailOptions = {
    to: email,
    subject: 'Reset Password',
    html: `<p>Please enter OTP to reset your password:</p>
    <h2>${otp}</h2>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.response}`);
  } catch (error) {
    logger.error(error);
    throw new Error('Error sending reset password email');
  }
};

module.exports = sendResetPasswordEmail;
