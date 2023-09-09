import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST,
  DB_URI: process.env.DB_URI,
};

export default config;
