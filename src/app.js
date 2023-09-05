// Import Express
import express from "express";

// Import Morgan
import morgan from "morgan";

//Import Cors
import cors from "cors";

// Import Config
import config from "./config/index.js";

// Import Debug
import debug from "debug";
const logger = debug("app:module-app");

// Import Path
//we can use dirname and filename
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Start Express Server
const app = express();

// Morgan
app.use(morgan("dev"));

// Cors
app.use(cors());

// Enable receive Json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//we indicate to express which is the path to public files
app.use(express.static(path.join(__dirname, "public")));

// Enable Server Listen
app.listen(config.PORT, () => {
  logger(`*** SERVER_LISTENING_ON_PORT http://localhost:${config.PORT} ***`);
  // console.log(
  //   `*** SERVER_LISTENING_ON_PORT http://localhost:${config.PORT} ***`
  // );
});
