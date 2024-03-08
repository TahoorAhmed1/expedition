const cloudinary = require('@/configs/cloudinary');
const { okResponse } = require('../constants/responses');
const { logger } = require('../configs/logger');

const uploadImage = async (req, res, next) => {
  const files = Object.values(req.files)[0];

  const images = files.map(async (file) => {
    const b64 = Buffer.from(file.buffer).toString('base64');
    const dataURI = `data:${file.mimetype};base64,${b64}`;

    try {
      const result = await cloudinary.uploader.upload(dataURI, {
        resource_type: 'auto',
        folder: file.fieldname,
        public_id: `${file.originalname.split('.')[0]}-${Date.now()}`,
      });
      return result;
    } catch (error) {
      logger.error('Error uploading image to cloudinary.', error);
      return next(error);
    }
  });

  const cloudinaryResponse = await Promise.all(images);

  const urls = cloudinaryResponse.map((response) => response.secure_url);

  const response = okResponse(urls);
  return res.status(response.status.code).json(response);
};

module.exports = uploadImage;
