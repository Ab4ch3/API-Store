// Import express-validator & function check
import { check } from 'express-validator';

// Import handleValidator
import validateResults from '../../helpers/handleValidator.js';

// Define Validadate Based on models
const validatorCreateCategory = [
  check('name').exists().notEmpty().isString(),
  check('description').exists().notEmpty().isString(),
  (req, res, next) => {
    return validateResults(req, res, next);
  }
];
const validatorUpdateStatus = [
  check('status').exists().notEmpty().isBoolean(),
  (req, res, next) => {
    return validateResults(req, res, next);
  }
];

export { validatorCreateCategory, validatorUpdateStatus };
