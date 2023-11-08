// import routerx
import routerx from 'express-promise-router';
// Import Controller
import {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  enableCategory,
  disableCategory,
  deleteCategory
} from '../../controllers/category_controller.js';
// Import Validator
import {
  validatorCreateCategory,
  validatorUpdateStatus
} from '../../middleware/validators/category_validator.js';
// Import middleware
import { verifyStoreKepper } from '../../middleware/auth_middleware.js';

const router = routerx();

router
  .get('/:CategoryId', verifyStoreKepper, getCategory)
  .put('/:CategoryId', verifyStoreKepper, updateCategory)
  .delete('/:CategoryId', verifyStoreKepper, deleteCategory)
  .patch(
    '/:CategoryId/enable',
    verifyStoreKepper,
    validatorUpdateStatus,
    enableCategory
  )
  .patch(
    '/:CategoryId/disable',
    verifyStoreKepper,
    validatorUpdateStatus,
    disableCategory
  )
  .get('/', verifyStoreKepper, getAllCategories)
  .post('/', verifyStoreKepper, validatorCreateCategory, createCategory);

export default router;
