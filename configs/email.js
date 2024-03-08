// const nodemailer = require('nodemailer');
// const {logger} = require('./logger');

// const resendPassword = process.env.RESEND_PASSWORD;

// const sendEmail = async (mail) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: 'smtp.resend.com',
//       secure: true,
//       port: 465,
//       auth: {
//         user: 'resend',
//         pass: resendPassword,
//       },
//     });

//     const mailOptions = {
//       from: 'Internative Traders <info@internativetraders.com>',
//       to: 'internativetraders@gmail.com',
//       bcc: mail.to || [],
//       cc: [],
//       subject: mail.subject,
//       html: mail.html,
//     };

//     const info = await transporter.sendMail(mailOptions);

//     return info;
//   } catch (err) {
//     logger.error(err);
//     throw err;
//   }
// };

// module.exports = sendEmail;

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

module.exports = transporter;
