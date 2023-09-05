// Import Debug
import debug from "debug";
const logger = debug("app:module-mongodb");

// Import mongoose
import mongoose from "mongoose";

// Import config
import config from "../config/index.js";

const mongoConnection = async () => {
  let connection = null;
  try {
    if (!connection) {
      connection = await mongoose.connect(config.DB_URI);
      logger(`**** CONNECTED TO MONGODB ATLAS ****`);
    }
    logger(`**** REUSING TO MONGODB ATLAS ****`);
    connection;
  } catch (e) {
    logger(`**** CONNECTION ERROR ****`);
    logger(e);
  }
};

export default mongoConnection;
