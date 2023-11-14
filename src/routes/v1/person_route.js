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
} from '../../controllers/person_controller.js';
// Import Validator
import {
  validatorCreatePerson,
  validatorUpdateStatus
} from '../../middleware/validators/person_validator.js';
// Import middleware
import { verifyUserAuth } from '../../middleware/auth_middleware.js';

const router = routerx();
/**
 * CREATE PERSON
 * @swagger
 * tags:
 *   name: Persons
 *   description: Everything about Persons
 * /persons:
 *   post:
 *     summary: Add a new Persons into the System
 *     tags: [Persons]
 *     security:
 *       -  bearerAuth: []
 *     requestBody:
 *       description : Create a new Person
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            properties:
 *              type_person:
 *                   type: string
 *                   example: Provider
 *              name:
 *                   type: string
 *                   example: Inv Abache C.A
 *              document_type:
 *                   type: string
 *                   example: RUT
 *              document_num:
 *                   type: string
 *                   example: 124124124
 *              address:
 *                   type: string
 *                   example: Direccion lalalallala
 *              phone:
 *                   type: string
 *                   example: +58 413-2312343
 *              email:
 *                   type: string
 *                   example: ab4che@test.com
 *              status:
 *                   type: boolean
 *                   example: true
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: "PERSON_CREATED"
 *                 data:
 *                  type: object
 *                  properties:
 *                   type_person:
 *                    type: string
 *                    example: Provider
 *                   name:
 *                    type: string
 *                    example: "Inv Abache C.A"
 *                   document_type:
 *                    type: string
 *                    example: RUT
 *                   document_num:
 *                    type: string
 *                    example: 124124124
 *                   address:
 *                    type: string
 *                    example: villa rosa
 *                   phone:
 *                    type: string
 *                    example: 04168421567
 *                   email:
 *                    type: string
 *                    example: villarosa@test.com
 *                   status:
 *                    type: boolean
 *                    example: true
 *                   _id:
 *                    type: string
 *                    example: '655045993b8edc734e4ceda1'
 *                   created_at:
 *                    type: string
 *                    example: "2023-11-12T03:25:13.362Z"
 *
 *       5XX:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "ERROR_CREATED_PERSON"
 *
 */
router.post('/', verifyUserAuth, validatorCreatePerson, createPerson);
/** GET ALL PERSONS
 * @swagger
 * /persons:
 *   get:
 *     summary: Lists all Persons into the system
 *     tags: [Persons]
 *     security:
 *       -  bearerAuth: []
 *     responses:
 *       200:
 *         description: Lists all Persons
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: "#/components/schemas/person"
 *       5XX:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "ERROR_GET_PERSONS"
 */
router.get('/', verifyUserAuth, getAllPersons);
/** GET ALL PERSONS
 * @swagger
 * /persons/clients:
 *   get:
 *     summary: Lists all Clients into the system
 *     tags: [Persons]
 *     security:
 *       -  bearerAuth: []
 *     responses:
 *       200:
 *         description: Lists all Clients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: "#/components/schemas/person"
 *       5XX:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "ERROR_GET_CLIENTS"
 */
router.get('/clients', verifyUserAuth, getAllClients);
/** GET ALL PROVIDERS
 * @swagger
 * /persons/providers:
 *   get:
 *     summary: Lists all Providers into the system
 *     tags: [Persons]
 *     security:
 *       -  bearerAuth: []
 *     responses:
 *       200:
 *         description: Lists all Providers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: "#/components/schemas/person"
 *       5XX:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "ERROR_GET_PROVIDERS"
 */
router.get('/providers', verifyUserAuth, getAllProviders);
/**
 * GET PERSON BY ID
 * @swagger
 * /persons/{PersonId}:
 *   get:
 *     summary: Get an existing Person by ID
 *     tags: [Persons]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: PersonId
 *          schema:
 *             type: string
 *             format: uuid
 *          required: true
 *          description : The Person ID
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   items:
 *                      $ref: "#/components/schemas/person"
 *       404:
 *         description: The Person was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "NOT_FOUND"
 *       5XX:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "ERROR_GET_PERSON"
 */
router.get('/:PersonId', verifyUserAuth, getPerson);
/**
 * UPDATE A PERSON
 * @swagger
 * /persons/{PersonId}:
 *   put:
 *     summary: Update an existing Person
 *     tags: [Persons]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: PersonId
 *          schema:
 *             type: string
 *             format: uuid
 *          required: true
 *          description : The Person ID
 *     requestBody:
 *       description : Update an existent Person
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            properties:
 *              type_person:
 *                   type: string
 *                   example: Provider
 *              name:
 *                   type: string
 *                   example: Inv Abache C.A
 *              document_type:
 *                   type: string
 *                   example: RUT
 *              document_num:
 *                   type: string
 *                   example: 124124124
 *              address:
 *                   type: string
 *                   example: Direccion lalalallala
 *              phone:
 *                   type: string
 *                   example: +58 413-2312343
 *              email:
 *                   type: string
 *                   example: ab4che@test.com
 *
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: "PERSON_UPDATED"
 *                 data:
 *                  type: object
 *                  properties:
 *                   id:
 *                     type: string
 *                     example: 6553f1d861f9c918a29d4007
 *                   type_person:
 *                    type: string
 *                    example: Provider
 *                   name:
 *                    type: string
 *                    example: "Inv Abache C.A"
 *                   document_type:
 *                    type: string
 *                    example: RUT
 *                   document_num:
 *                    type: string
 *                    example: 124124124
 *                   address:
 *                    type: string
 *                    example: villa rosa
 *                   phone:
 *                    type: string
 *                    example: 04168421567
 *                   email:
 *                    type: string
 *                    example: villarosa@test.com
 *                   status:
 *                    type: boolean
 *                    example: true
 *                   _id:
 *                    type: string
 *                    example: '655045993b8edc734e4ceda1'
 *                   created_at:
 *                    type: string
 *                    example: "2023-11-12T03:25:13.362Z"
 *       404:
 *         description: The Person was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "NOT_FOUND"
 *       5XX:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "ERROR_UPDATED_PERSON"
 */
router.put('/:PersonId', verifyUserAuth, updatePerson);
/**
 * ENABLE PERSON
 * @swagger
 * /person/{PersonId}/enable:
 *   patch:
 *     summary: Enable an existing Person
 *     tags: [Persons]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: PersonId
 *          schema:
 *             type: string
 *             format: objectID
 *          required: true
 *          description : The Person ID
 *     requestBody:
 *       status : Enable an existent Person
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *               type: object
 *               properties:
 *                status:
 *                   type: boolean
 *                   example: true
 *
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: "PERSON_ENABLED"
 *                 data:
 *                   $ref: "#/components/schemas/person"
 *
 *       404:
 *         description: The Person was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "NOT_FOUND"
 *       5XX:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "ERROR_DISABLED_PERSON"
 */
router.patch(
  '/:PersonId/enable',
  verifyUserAuth,
  validatorUpdateStatus,
  enablePerson
);
/**
 * DISABLE PERSON
 * @swagger
 * /person/{PersonId}/disable:
 *   patch:
 *     summary: Disable an existing Person
 *     tags: [Persons]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: PersonId
 *          schema:
 *             type: string
 *             format: objectID
 *          required: true
 *          description : The Person ID
 *     requestBody:
 *       status : Disable an existent Person
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *               type: object
 *               properties:
 *                status:
 *                   type: boolean
 *                   example: false
 *
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: "PERSON_DISABLED"
 *                 data:
 *                   $ref: "#/components/schemas/person"
 *
 *       404:
 *         description: The Person was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "NOT_FOUND"
 *       5XX:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "ERROR_DISABLED_PERSON"
 */
router.patch(
  '/:PersonId/disable',
  verifyUserAuth,
  validatorUpdateStatus,
  disablePerson
);
/**
 * DELETE CATEGORY
 * @swagger
 * /persons/{PersonId}:
 *   delete:
 *     summary: Delete an existing Person
 *     tags: [Persons]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: PersonId
 *          schema:
 *             type: objectID
 *             format: string
 *          required: true
 *          description : The Person ID
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: "PERSON_DELETED"
 *                 data:
 *                     $ref: "#/components/schemas/person"
 *       404:
 *         description: The Person was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "NOT_FOUND"
 *       5XX:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "ERROR_DELETED_PERSON"
 */
router.delete('/:PersonId', verifyUserAuth, deletePerson);
export default router;
