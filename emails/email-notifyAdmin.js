// const sendEmail = require('@/configs/email.config');
const transporter = require('@/configs/email');
const { logger } = require('../configs/logger');

const notifyAdminEmail = async (data) => {
  const mailOptions = {
    to: 'abrar.internativelabs@gmail.com',
    subject: 'Contact message',
    html: ` <p>User: ${data.name} wants to contact.</p>
            <p>Email: ${data.email}</p>
            <p>Phone number: ${data.phone}</p>
            <p>Message: ${data.message}</p>
            <a href='${process.env.CMS_FRONTEND_DOMAIN}/contact-messages/${data.id}'>click to view on cms</a>
            `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.response}`);
  } catch (error) {
    logger.error(error);
    throw new Error('Error sending notify admin email');
  }
};

module.exports = notifyAdminEmail;
