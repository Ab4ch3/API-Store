// Import express-validator & function check
import { check } from 'express-validator';

// Import handleValidator
import validateResults from '../../helpers/handle_validator.js';

// Define Validadate Based on models
const validatorCreateSale = [
  check('user').exists().notEmpty().isMongoId(),
  check('person').exists().notEmpty().isMongoId(),
  check('voucher_type').exists().notEmpty().isString(),
  check('voucher_num').exists().notEmpty().isString(),
  check('tax').exists().notEmpty().isNumeric(),
  check('total').exists().notEmpty().isNumeric(),
  check('details').exists().notEmpty().isArray(),
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

export { validatorCreateSale, validatorUpdateStatus };
