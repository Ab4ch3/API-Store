// import routerx
import routerx from 'express-promise-router';
// Import Controller
import {
  getAllUsers,
  getUser,
  createUser,
  updateUsers,
  updatePassword,
  enableUser,
  disableUser,
  deleteUser
} from '../../controller/userController.js';
// Import Validator
import {
  validatorCreateUser,
  validatorUpdatePassword,
  validatorUpdateStatus
} from '../../middleware/validators/userValidator.js';
// Import middleware
import { verifyAdmin } from '../../middleware/authMiddleware.js';

const router = routerx();

router
  .get('/:UserId', verifyAdmin, getUser)
  .put('/:UserId', verifyAdmin, updateUsers)
  .delete('/:UserId', verifyAdmin, deleteUser)
  .patch('/:UserId/enable', verifyAdmin, validatorUpdateStatus, enableUser)
  .patch('/:UserId/disable', verifyAdmin, validatorUpdateStatus, disableUser)
  .patch('/:UserId/password', validatorUpdatePassword, updatePassword)
  .get('/', verifyAdmin, getAllUsers)
  .post('/', verifyAdmin, validatorCreateUser, createUser);

export default router;
