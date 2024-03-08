const express = require('express');

const googlePassport = require('passport');
require('@/configs/OAuth/google.passport')(googlePassport);

const router = express.Router();

// for webApp
router.get('/', googlePassport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/callback', googlePassport.authenticate('google', { session: false }), (req, res) => {
  res.status(200).redirect(`${process.env.FRONTEND_DOMAIN}/?access_token=${req.user}`);
});

module.exports = router;
