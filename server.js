require('module-alias/register');

const env = require('dotenv');
const path = require('path');

const { logger } = require('./configs/logger');

if (process.env.NODE_ENV === 'dev') {
  env.config({ path: path.join(__dirname, '.env.dev') });
} else if (process.env.NODE_ENV === 'stage') {
  env.config({ path: path.join(__dirname, '.env.stage') });
} else if (process.env.NODE_ENV === 'qa') {
  env.config({ path: path.join(__dirname, '.env.qa') });
} else {
  env.config();
}
// console.log(process.env.TEST);
const app = require('./app');

app.listen(process.env.PORT, () => {
  logger.info(`listening on ${process.env.PORT}`);
});
