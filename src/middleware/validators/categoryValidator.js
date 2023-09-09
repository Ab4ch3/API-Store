// Import express-validator & function check
import { check } from "express-validator";

// Import handleValidator
import validateResults from "../../helpers/handleValidator.js";

// Define Validadate Based on models
const validatorCreateCategory = [
  check("name").exists().notEmpty(),
  check("description").exists().notEmpty(),
  check("status").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export { validatorCreateCategory };
