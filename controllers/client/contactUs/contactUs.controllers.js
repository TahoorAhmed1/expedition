const { prisma } = require('@/configs/prisma');

const { createSuccessResponse } = require('@/constants/responses');
const notifyAdminEmail = require('@/emails/email-notifyAdmin');

const submitMessage = async (req, res, next) => {
  const {
    name, email, phone, message,
  } = req.body;

  try {
    const contactMessage = await prisma.contactMessages.create({
      data: {
        name,
        email,
        phone,
        message,
      },
    });

    await notifyAdminEmail(contactMessage);
    const response = createSuccessResponse(null, 'Your message has been received.');
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitMessage,
};
