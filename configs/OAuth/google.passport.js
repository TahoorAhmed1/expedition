const GoogleStrategy = require('passport-google-oauth2').Strategy;
const authService = require('@/services/auth.service');
const { logger } = require('../logger');

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_DOMAIN}/api/users/auth/oauth/google/callback`,
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        const { displayName: name, email, picture } = profile;

        try {
          const token = await authService.googleLogin(name, email, picture);
          return done(null, token);
        } catch (error) {
          logger.error('google OAuth error --> ', error);

          return done(error, false);
        }
      },
    ),
  );
};
