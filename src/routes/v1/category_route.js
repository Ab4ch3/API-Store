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
/**
 * CREATE CATEGORY
 * @swagger
 * /categories:
 *   post:
 *     summary: Add a new Category to the store
 *     tags: [Categories]
 *     security:
 *       -  bearerAuth: []
 *     requestBody:
 *       description : Create a new Category
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/category'
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
 *                   example: "CATEGORY_CREATED"
 *                 data:
 *                   $ref: "#/components/schemas/category"
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
 *                       example: "ERROR_CREATE_CATEGORY"
 *
 */
router.post('/', verifyStoreKepper, validatorCreateCategory, createCategory);

/** GET CATEGORIES
 * @swagger
 * tags:
 *   name: Categories
 *   description: Everything about Categories
 * /categories:
 *   get:
 *     summary: Lists all Categories
 *     tags: [Categories]
 *     security:
 *       -  bearerAuth: []
 *     responses:
 *       200:
 *         description: Lists all Categories
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
 *                      $ref: "#/components/schemas/category"
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
 *                       example: "ERROR_GET_CATEGORIES"
 */
router.get('/', verifyStoreKepper, getAllCategories);

/**
 * GET CATEGORY
 * @swagger
 * /categories/{CategoryId}:
 *   get:
 *     summary: Get an existing Category
 *     tags: [Categories]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: CategoryId
 *          schema:
 *             type: string
 *             format: uuid
 *          required: true
 *          description : The Category ID
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
 *                   type: array
 *                   items:
 *                      $ref: "#/components/schemas/category"
 *       404:
 *         description: The Category was not found
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
 *                       example: "ERROR_GET_CATEGORY"
 */
router.get('/:CategoryId', verifyStoreKepper, getCategory);
/**
 * @swagger
 * /categories/{CategoryId}:
 *   put:
 *     summary: Update an existing Category
 *     tags: [Categories]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: CategoryId
 *          schema:
 *             type: string
 *             format: uuid
 *          required: true
 *          description : The Category ID
 *     requestBody:
 *       description : Update an existent category
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                name:
 *                   type: string
 *                   example: Category #3
 *                description:
 *                   type: string
 *                   example: AboutCategory #3
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
 *                   example: "CATEGORY_UPDATED"
 *                 data:
 *                    $ref: "#/components/schemas/category"
 *       404:
 *         description: The Category was not found
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
 *                       example: "ERROR_UPDATED_CATEGORY"
 */
router.put('/:CategoryId', verifyStoreKepper, updateCategory);
/**
 * ENABLE CATEGORY
 * @swagger
 * /categories/{CategoryId}/enable:
 *   patch:
 *     summary: Update an existing Category
 *     tags: [Categories]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: CategoryId
 *          schema:
 *             type: objectID
 *             format: string
 *          required: true
 *          description : The Category ID
 *     requestBody:
 *       status : Update an existent category
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *               type: object
 *               properties:
 *                status:
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
 *                   example: "CATEGORY_ENABLED"
 *                 data:
 *                   $ref: "#/components/schemas/category"
 *       404:
 *         description: The Category was not found
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
 *                       example: "ERROR_ENABLED_CATEGORY"
 */
router.patch(
  '/:CategoryId/enable',
  verifyStoreKepper,
  validatorUpdateStatus,
  enableCategory
);
/**
 * DISABLE CATEGORY
 * @swagger
 * /categories/{CategoryId}/disable:
 *   patch:
 *     summary: Update an existing Category
 *     tags: [Categories]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: CategoryId
 *          schema:
 *             type: string
 *             format: objectID
 *          required: true
 *          description : The Category ID
 *     requestBody:
 *       status : Update an existent category
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
 *                   example: "CATEGORY_DISABLED"
 *                 data:
 *                   $ref: "#/components/schemas/category"
 *
 *       404:
 *         description: The Category was not found
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
 *                       example: "ERROR_DISABLED_CATEGORY"
 */
router.patch(
  '/:CategoryId/disable',
  verifyStoreKepper,
  validatorUpdateStatus,
  disableCategory
);

/**
 * DELETE CATEGORY
 * @swagger
 * /categories/{CategoryId}:
 *   delete:
 *     summary: Delete an existing Category
 *     tags: [Categories]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: CategoryId
 *          schema:
 *             type: objectID
 *             format: string
 *          required: true
 *          description : The Category ID
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
 *                   example: "CATEGORY_DELETED"
 *                 data:
 *                     $ref: "#/components/schemas/category"
 *       404:
 *         description: The Category was not found
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
 *                       example: "ERROR_DELETED_CATEGORY"
 */
router.delete('/:CategoryId', verifyStoreKepper, deleteCategory);

export default router;
