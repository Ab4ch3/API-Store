// import routerx
import routerx from 'express-promise-router';
// Import Controller
import {
  getAllSale,
  getSale,
  createSale,
  enableSale,
  disableSale,
  getGraph12Months,
  getCheckDates
} from '../../controllers/sale_controller.js';
// Import Validator
import {
  validatorCreateSale,
  validatorUpdateStatus
} from '../../middleware/validators/sale_validator.js';
// Import middleware
import {
  verifySeller,
  verifyUserAuth
} from '../../middleware/auth_middleware.js';

const router = routerx();

router
  .get('/graph12', verifyUserAuth, getGraph12Months)
  .get('/checkDates', verifyUserAuth, getCheckDates)
  .get('/:SaleId', verifySeller, getSale)
  .patch('/:SaleId/enable', verifySeller, validatorUpdateStatus, enableSale)
  .patch('/:SaleId/disable', verifySeller, validatorUpdateStatus, disableSale)
  .get('/', verifySeller, getAllSale)
  .post('/', verifySeller, validatorCreateSale, createSale);

export default router;
