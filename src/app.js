// Import Express
import express from 'express';
// Import Morgan
import morgan from 'morgan';
// Import Cors
import cors from 'cors';
// Import MongoConnection
import mongoConnection from './database/index.js';
// Import Config
import config from './config/index.js';
// Import Debug
import debug from 'debug';
// Import Path
// we can use dirname and filename
// import path from 'path';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
// Import Route
import v1Router from './routes/v1/index.js';
const logger = debug('app:module-app');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Start Express Server
const app = express();

// Start Conecction Database
mongoConnection();

// Morgan
app.use(morgan('dev'));

// Cors
app.use(cors());

// Enable receive Json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// we indicate to express which is the path to public files
app.use(express.static(path.join(__dirname, 'public')));

// Invoke Route
app.use(v1Router);

// Enable Server Listen
app.listen(config.PORT, () => {
  logger(`****  SERVER_LISTENING_ON ${config.PUBLIC_URL}:${config.PORT} ****`);
});
