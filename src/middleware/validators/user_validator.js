// Import express-validator & function check
import { check } from 'express-validator';

// Import handleValidator
import validateResults from '../../helpers/handle_validator.js';

// Define Validadate Based on models
const validatorCreateUser = [
  check('role').exists().notEmpty().isString(),
  check('name').exists().notEmpty().isString(),
  check('document_type').isString(),
  check('document_num').isString(),
  check('address').isString(),
  check('phone').isString(),
  check('email').exists().notEmpty().isString(),
  check('password').exists().notEmpty().isString(),
  (req, res, next) => {
    return validateResults(req, res, next);
  }
];

const validatorUpdatePassword = [
  check('password').exists().notEmpty().isString(),
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

export { validatorCreateUser, validatorUpdatePassword, validatorUpdateStatus };
