import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  PUBLIC_URL: process.env.PUBLIC_URL,
  DB_URI: process.env.DB_URI,
};

export default config;
