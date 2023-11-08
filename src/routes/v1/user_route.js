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
} from '../../controllers/user_controller.js';
// Import Validator
import {
  validatorCreateUser,
  validatorUpdatePassword,
  validatorUpdateStatus
} from '../../middleware/validators/user_validator.js';
// Import middleware
import { verifyAdmin } from '../../middleware/auth_middleware.js';

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
