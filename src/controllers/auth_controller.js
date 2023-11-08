// Import Debug
import debug from 'debug';
// Import handlehttpErrors
import httpErrors from '../helpers/handle_errors.js';
// Import Services
import authServices from '../services/auth_services.js';
const logger = debug('app:module-auth_controller');

/**
 * Get User Auth
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const singIn = async (req, res, next) => {
  const { body } = req;
  try {
    const user = await authServices.singIn(body);

    if (user === null) {
      httpErrors(res, 'USER_&_PASSWORD_ERROR');
    }

    res.status(200).json({
      status: 'OK',
      data: user
    });
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_SERVER');
    next(e);
  }
};

export { singIn };
