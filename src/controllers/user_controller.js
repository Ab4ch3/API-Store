// Import Debug
import debug from 'debug';
// Import handlehttpErrors
import httpErrors from '../helpers/handle_errors.js';
// Import Services
import userServices from '../services/user_services.js';
// Import Validator
import { matchedData } from 'express-validator';
const logger = debug('app:module-userController');

/**
 * Get All Users
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAllUsers = async (req, res, next) => {
  const {
    query: { find }
  } = req;
  try {
    const allUsers = await userServices.getAllUsers(find);
    res.status(200).json({
      status: 'OK',
      data: allUsers
    });
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_GET_USERS');
    next(e);
  }
};
/**
 * Get One User
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getUser = async (req, res, next) => {
  try {
    const {
      params: { UserId }
    } = req;
    const user = await userServices.getUser(UserId);
    if (!user) {
      httpErrors(res, 'NOT_FOUND', 404);
    } else {
      res.status(200).json({
        status: 'OK',
        data: user
      });
    }
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_GET_USER');
    next(e);
  }
};

/**
 * Create User
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createUser = async (req, res, next) => {
  try {
    const body = matchedData(req);
    const createdUser = await userServices.createUser(body);
    res.status(200).json({
      status: 'OK',
      message: 'USER_CREATED',
      data: createdUser
    });
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_CREATED_USER');
    next(e);
  }
};

/**
 * Update User
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const updateUsers = async (req, res, next) => {
  try {
    const {
      params: { UserId }
    } = req;
    const { body } = req;
    const updatedUser = await userServices.updateUsers(UserId, body);
    if (!updatedUser) {
      return httpErrors(res, 'NOT_FOUND', 404);
    }

    res.status(200).json({
      status: 'OK',
      message: 'USER_UPDATED',
      data: updatedUser
    });
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_UPDATED_USER');
    next(e);
  }
};

/**
 * Update Password User
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const updatePassword = async (req, res, next) => {
  try {
    const {
      params: { UserId }
    } = req;
    const { body } = req;
    if (body.password === '') {
      return httpErrors(res, 'BAD_REQUEST', 400);
    }

    const updatedUser = await userServices.updatePassword(UserId, body);

    if (!updatedUser) {
      return httpErrors(res, 'NOT_FOUND', 404);
    }

    res.status(200).json({
      status: 'OK',
      message: 'PASSWORD_UPDATED',
      data: updatedUser
    });
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_UPDATED_PASSWORD_USER');
    next(e);
  }
};

/**
 * Enable User
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const enableUser = async (req, res, next) => {
  try {
    const {
      params: { UserId }
    } = req;
    const { body } = req;
    const enabledUser = await userServices.enableUser(UserId, body);
    if (!enabledUser) {
      return httpErrors(res, 'NOT_FOUND', 404);
    }

    res.status(200).json({
      status: 'OK',
      message: 'USER_ENABLED',
      data: enabledUser
    });
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_ENABLED_USER');
    next(e);
  }
};

/**
 * disable User
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const disableUser = async (req, res, next) => {
  try {
    const {
      params: { UserId }
    } = req;
    const { body } = req;
    const disabledUser = await userServices.disableUser(UserId, body);
    if (!disabledUser) {
      return httpErrors(res, 'NOT_FOUND', 404);
    }

    res.status(200).json({
      status: 'OK',
      message: 'USER_DISABLED',
      data: disabledUser
    });
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_DISABLED_USER');
    next(e);
  }
};

/**
 * delete User
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteUser = async (req, res, next) => {
  try {
    const {
      params: { UserId }
    } = req;
    const deletedUser = await userServices.deleteUser(UserId);
    if (!deletedUser) {
      return httpErrors(res, 'NOT_FOUND', 404);
    }

    res.status(200).json({
      status: 'OK',
      message: 'USER_DELETED',
      data: deletedUser
    });
  } catch (e) {
    logger(e);
    httpErrors(res, 'ERROR_DELETED_USER');
    next(e);
  }
};

export {
  getAllUsers,
  getUser,
  createUser,
  updateUsers,
  updatePassword,
  enableUser,
  disableUser,
  deleteUser
};
