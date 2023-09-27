// Import Debug
import debug from "debug";
const logger = debug("app:module-authController");
// Import handlehttpErrors
import httpErrors from "../helpers/handleErrors.js";
// Import Services
import authServices from "../services/authServices.js";

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
      httpErrors(res, "USER_&_PASSWORD_ERROR");
    }

    res.status(200).json({
      status: "OK",
      data: user,
    });
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_SERVER");
    next(e);
  }
};

export { singIn };
