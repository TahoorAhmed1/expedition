// const sendEmail = require('@/configs/email.config');
const transporter = require('@/configs/email');
const { logger } = require('../configs/logger');

const notifyNewAdminEmail = async (data) => {
  const mailOptions = {
    to: data.email,
    subject: 'You are now an admin',
    html: ` 
            <p>Email: ${data.email}</p>
            <p>Password: ${data.password}</p>
            <a href='${process.env.CMS_FRONTEND_DOMAIN}'>Login</a>
            `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.response}`);
  } catch (error) {
    logger.error(error);
    throw new Error('Error sending notifyNewAdminEmail email');
  }
};

module.exports = notifyNewAdminEmail;
