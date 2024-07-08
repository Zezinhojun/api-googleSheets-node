import { config as conf } from 'dotenv';
conf();

const config = {
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  production: process.env.PRODUCTION,
  JwtSecret: process.env.JWT_SECRET,
};

export default config;
