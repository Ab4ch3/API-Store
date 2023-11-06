// import routerx
import routerx from 'express-promise-router';
// Import Controller
import {
  getAllPersons,
  getAllClients,
  getAllProviders,
  getPerson,
  createPerson,
  updatePerson,
  enablePerson,
  disablePerson,
  deletePerson
} from '../../controller/personController.js';
// Import Validator
import {
  validatorCreatePerson,
  validatorUpdateStatus
} from '../../middleware/validators/personValidator.js';
// Import middleware
import { verifyUserAuth } from '../../middleware/authMiddleware.js';

const router = routerx();

router
  .post('/', verifyUserAuth, validatorCreatePerson, createPerson)
  .get('/', verifyUserAuth, getAllPersons)
  .get('/clients', verifyUserAuth, getAllClients)
  .get('/providers', verifyUserAuth, getAllProviders)
  .get('/:PersonId', verifyUserAuth, getPerson)
  .put('/:PersonId', verifyUserAuth, updatePerson)
  .delete('/:PersonId', verifyUserAuth, deletePerson)
  .patch(
    '/:PersonId/enable',
    verifyUserAuth,
    validatorUpdateStatus,
    enablePerson
  )
  .patch(
    '/:PersonId/disable',
    verifyUserAuth,
    validatorUpdateStatus,
    disablePerson
  );

export default router;
