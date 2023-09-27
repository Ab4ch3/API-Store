// Import express-validator & function check
import { check } from "express-validator";

// Import handleValidator
import validateResults from "../../helpers/handleValidator.js";

// Define Validadate Based on models
const validatorCreateArticle = [
  check("category").exists().notEmpty().isMongoId(),
  check("code").exists().notEmpty().isAlphanumeric(),
  check("name").exists().notEmpty().isString(),
  check("description").exists().notEmpty().isString(),
  check("sell_price").exists().notEmpty(),
  check("stock").exists().notEmpty().isNumeric(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
const validatorUpdateStatus = [
  check("status").exists().notEmpty().isBoolean(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export { validatorCreateArticle, validatorUpdateStatus };
