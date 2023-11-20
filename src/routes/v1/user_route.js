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
/**
 * CREATE USER
 * @swagger
 * tags:
 *   name: Users
 *   description: Everything about Users
 * /users:
 *   post:
 *     summary: Add a new User to the store
 *     tags: [Users]
 *     security:
 *       -  bearerAuth: []
 *     requestBody:
 *       description : Create a new User
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            properties:
 *              role:
 *                   type: string
 *                   example: Admin | seller | Storekeeper
 *              name:
 *                   type: string
 *                   example: miguel lala
 *              document_type:
 *                   type: string
 *                   example: V
 *              document_num:
 *                   type: string
 *                   example: 19448280
 *              phone:
 *                   type: string
 *                   example: 04148821867
 *              email:
 *                   type: string
 *                   example: miguel@test.com
 *              password:
 *                   type: string
 *                   example: test
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
 *                   example: "USER_CREATED"
 *                 data:
 *                  $ref: "#/components/schemas/user"
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
 *                       example: "ERROR_CREATED_USER"
 *
 */
router.post('/', verifyAdmin, validatorCreateUser, createUser);
/** GET ALL USERS
 * @swagger
 * /users:
 *   get:
 *     summary: Lists all Users to the store
 *     tags: [Users]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: find
 *          schema:
 *             type: string
 *          description : Find by name or email
 *     responses:
 *       200:
 *         description: Lists all Users
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
 *                      $ref: "#/components/schemas/user"
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
 *                       example: "ERROR_GET_USERS"
 */
router.get('/', verifyAdmin, getAllUsers);
/**
 * GET USER BY ID
 * @swagger
 * /users/{UserId}:
 *   get:
 *     summary: Get an existing User by ID
 *     tags: [Users]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: UserId
 *          schema:
 *             type: string
 *             format: uuid
 *          required: true
 *          description : The User ID
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
 *                      $ref: "#/components/schemas/user"
 *       404:
 *         description: The User was not found
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
 *                       example: "ERROR_GET_USER"
 */
router.get('/:UserId', verifyAdmin, getUser);
/**
 * UPDATE AN USER
 * @swagger
 * /users/{UserId}:
 *   put:
 *     summary: Update an existing User
 *     tags: [Users]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: UserId
 *          schema:
 *             type: string
 *             format: uuid
 *          required: true
 *          description : The User ID
 *     requestBody:
 *       description : Update an existent user
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            properties:
 *              role:
 *                   type: string
 *                   example: Storekeeper
 *              name:
 *                   type: string
 *                   example: miguel lala
 *              document_type:
 *                   type: string
 *                   example: V
 *              document_num:
 *                   type: string
 *                   example: 19448280
 *              phone:
 *                   type: string
 *                   example: 04148821867
 *              email:
 *                   type: string
 *                   example: miguel@test.com\
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
 *                   example: "USER_UPDATED"
 *                 data:
 *                    $ref: "#/components/schemas/user"
 *       404:
 *         description: The User was not found
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
 *                       example: "ERROR_UPDATED_USER"
 */
router.put('/:UserId', verifyAdmin, updateUsers);
/**
 * DELETE USER
 * @swagger
 * /users/{UserId}:
 *   delete:
 *     summary: Delete an existing User
 *     tags: [Users]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: UserId
 *          schema:
 *             type: objectID
 *             format: string
 *          required: true
 *          description : The User ID
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
 *                   example: "USER_DELETED"
 *                 data:
 *                     $ref: "#/components/schemas/user"
 *       404:
 *         description: The User was not found
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
 *                       example: "ERROR_DELETED_USER"
 */
router.delete('/:UserId', verifyAdmin, deleteUser);
/**
 * DISABLE USER
 * @swagger
 * /users/{UserId}/enable:
 *   patch:
 *     summary: Enable an existing User
 *     tags: [Users]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: UserId
 *          schema:
 *             type: string
 *             format: objectID
 *          required: true
 *          description : The User ID
 *     requestBody:
 *       status : Enable an existent User
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
 *                   example: "USER_ENABLED"
 *                 data:
 *                   $ref: "#/components/schemas/user"
 *
 *       404:
 *         description: The User was not found
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
 *                       example: "ERROR_ENABLED_USER"
 */
router.patch('/:UserId/enable', verifyAdmin, validatorUpdateStatus, enableUser);
/**
 * DISABLE USER
 * @swagger
 * /users/{UserId}/disable:
 *   patch:
 *     summary: Disable an existing User
 *     tags: [Users]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: UserId
 *          schema:
 *             type: string
 *             format: objectID
 *          required: true
 *          description : The User ID
 *     requestBody:
 *       status : Disable an existent User
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
 *                   example: "USER_DISABLED"
 *                 data:
 *                   $ref: "#/components/schemas/user"
 *
 *       404:
 *         description: The User was not found
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
 *                       example: "ERROR_DISABLED_USER"
 */
router.patch(
  '/:UserId/disable',
  verifyAdmin,
  validatorUpdateStatus,
  disableUser
);
/**
 * UPDATE AN USER PASSWORD
 * @swagger
 * /users/{UserId}/password:
 *   patch:
 *     summary: Update Password an existing User
 *     tags: [Users]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: UserId
 *          schema:
 *             type: string
 *             format: uuid
 *          required: true
 *          description : The User ID
 *     requestBody:
 *       description : Update Password an existent user
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            properties:
 *              password:
 *                   type: string
 *                   example: 13daf2wedas
 *
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
 *                   example: "PASSWORD_UPDATED"
 *                 data:
 *                    $ref: "#/components/schemas/user"
 *       404:
 *         description: The User was not found
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
 *                       example: "ERROR_UPDATED_USER"
 */
router.patch('/:UserId/password', validatorUpdatePassword, updatePassword);

export default router;
