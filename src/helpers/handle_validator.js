// Import Express validador - validationResult
import { validationResult } from 'express-validator';
// Import handleHttpError
import handleHttpErros from '../helpers/handle_errors.js';

const validateResults = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  handleHttpErros(res, result.array(), 403);
};

export default validateResults;
