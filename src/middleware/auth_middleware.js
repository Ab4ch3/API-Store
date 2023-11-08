// Import JWT
import { decode } from '../helpers/handle_JWT.js';
// Import handlehttpErrors
import httpErrors from '../helpers/handle_errors.js';

/**
 * Verify user Auth
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const verifyUserAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return httpErrors(res, 'MISSING_TOKEN', 404);
  }

  // lo que hacemos es separa la cadena bear del token real
  const token = req.headers.authorization.split(' ').pop();
  const dataToken = await decode(token);
  // console.log(dataToken, "desde authmiddleware");

  if (
    dataToken.role === 'Admin' ||
    dataToken.role === 'Seller' ||
    dataToken.role === 'StoreKeeper'
  ) {
    next();
  } else {
    return httpErrors(res, 'UNAUTHORIZED', 403);
  }
};

/**
 * Verify User Admin
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const verifyAdmin = async (req, res, next) => {
  if (!req.headers.authorization) {
    return httpErrors(res, 'MISSING_TOKEN', 404);
  }

  // lo que hacemos es separa la cadena bear del token real
  const token = req.headers.authorization.split(' ').pop();

  const dataToken = await decode(token);
  if (dataToken.role === 'Admin') {
    next();
  } else {
    return httpErrors(res, 'UNAUTHORIZED', 403);
  }
};

/**
 * Verify User StoreKeeper
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const verifyStoreKepper = async (req, res, next) => {
  if (!req.headers.authorization) {
    return httpErrors(res, 'MISSING_TOKEN', 404);
  }

  // lo que hacemos es separa la cadena bear del token real
  const token = req.headers.authorization.split(' ').pop();
  const dataToken = await decode(token);

  if (dataToken.role === 'Admin' || dataToken.role === 'StoreKeeper') {
    next();
  } else {
    return httpErrors(res, 'UNAUTHORIZED', 403);
  }
};
/**
 * Verify User Seller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const verifySeller = async (req, res, next) => {
  if (!req.headers.authorization) {
    return httpErrors(res, 'MISSING_TOKEN', 404);
  }

  // lo que hacemos es separa la cadena bear del token real
  const token = req.headers.authorization.split(' ').pop();
  const dataToken = await decode(token);

  if (dataToken.role === 'Admin' || dataToken.role === 'Seller') {
    next();
  } else {
    return httpErrors(res, 'UNAUTHORIZED', 403);
  }
};

export { verifyUserAuth, verifyAdmin, verifyStoreKepper, verifySeller };
