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

/**
 * CREATE SALE
 * @swagger
 * tags:
 *   name: Sales
 *   description: Everything about Sales
 * /sales:
 *   post:
 *     summary: Add a new Sale into the System
 *     tags: [Sales]
 *     security:
 *       -  bearerAuth: []
 *     requestBody:
 *       description : Create a new Sale
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            properties:
 *              user:
 *                   type: string
 *                   format: objectID
 *                   example: 64fbb9728d57ad39926f5ea1
 *              person:
 *                   type: string
 *                   format: objectID
 *                   example: 64fbb9728d57ad39926f5ea1
 *              voucher_type:
 *                   type: string
 *                   example: FACTURA
 *              voucher_series:
 *                   type: string
 *                   example: 001
 *              voucher_num:
 *                   type: string
 *                   example: 003
 *              tax:
 *                   type: number
 *                   example: 0.18
 *              total:
 *                   type: number
 *                   example: 120
 *              details:
 *                   type: array
 *                   items:
 *                      type: object
 *                      properties:
 *                        id:
 *                         type: string
 *                         format: objectID
 *                         example: 64fbb9728d57ad39926f5ea1
 *                        article:
 *                         type: string
 *                         example: laptop
 *                        total_article:
 *                         type: number
 *                         example: 2
 *                        price:
 *                         type: number
 *                         example: 30
 *                        discount:
 *                         type: number
 *                         example: 10
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
 *                   example: "SALE_CREATED"
 *                 data:
 *                  type: object
 *                  properties:
 *                   user:
 *                    type: string
 *                    format: objectID
 *                    example: 64fbb9728d57ad39926f5ea1
 *                   person:
 *                    type: string
 *                    format: objectID
 *                    example: 64fbb9728d57ad39926f5ea1
 *                   voucher_type:
 *                    type: string
 *                    example: FACTURA
 *                   voucher_series:
 *                    type: string
 *                    example: 001
 *                   voucher_num:
 *                    type: string
 *                    example: 003
 *                   tax:
 *                    type: number
 *                    example: 0.18
 *                   total:
 *                    type: number
 *                    example: 120
 *                   details:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                         type: string
 *                         format: objectID
 *                         example: 64fbb9728d57ad39926f5ea1
 *                        article:
 *                         type: string
 *                         example: laptop
 *                        total_article:
 *                         type: number
 *                         example: 2
 *                        price:
 *                         type: number
 *                         example: 30
 *                        discount:
 *                         type: number
 *                         example: 10
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
 *                       example: "ERROR_CREATED_SALE"
 *
 */
router.post('/', verifySeller, validatorCreateSale, createSale);
/** GET ALL SALES
 * @swagger
 * /sales:
 *   get:
 *     summary: Lists all Sales into the system
 *     tags: [Sales]
 *     security:
 *       -  bearerAuth: []
 *     responses:
 *       200:
 *         description: Lists all Sales
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
 *                      $ref: "#/components/schemas/sale"
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
 *                       example: "ERROR_GET_SALES"
 */
router.get('/', verifySeller, getAllSale);
/** GET GRAPH SALES
 * @swagger
 * /sales/graph12:
 *   get:
 *     summary: Lists Graph Sales into the system
 *     tags: [Sales]
 *     security:
 *       -  bearerAuth: []
 *     responses:
 *       200:
 *         description: Lists Graph about Receipts
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
 *                   example: SALES_GRAPH_12_MONTHS
 *                 data:
 *                   type: array
 *                   items:
 *                      type: object
 *                      properties:
 *                        _id:
 *                         type: string
 *                         format: objectID
 *                         example: 64fbb9728d57ad39926f5ea1
 *                        month:
 *                         type: number
 *                         example: 11
 *                        year:
 *                         type: number
 *                         example: 2023
 *                        total:
 *                         type: number
 *                         example: 120
 *                        number:
 *                         type: number
 *                         example: 1
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
 *                       example: "ERROR_GET_GRAPH"
 */
router.get('/graph12', verifyUserAuth, getGraph12Months);
router.get('/checkDates', verifyUserAuth, getCheckDates);
/**
 * GET SALE BY ID
 * @swagger
 * /sales/{SaleId}:
 *   get:
 *     summary: Get an existing Sale by ID
 *     tags: [Sales]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: SaleId
 *          schema:
 *             type: string
 *             format: uuid
 *          required: true
 *          description : The Sale ID
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
 *                      $ref: "#/components/schemas/sale"
 *       404:
 *         description: The Sale was not found
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
 *                       example: "ERROR_GET_SALE"
 */
router.get('/:SaleId', verifySeller, getSale);
/**
 * ENABLE SALES
 * @swagger
 * /sales/{SaleId}/enable:
 *   patch:
 *     summary: Enable an existing Sale
 *     tags: [Sales]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: SaleId
 *          schema:
 *             type: objectID
 *             format: string
 *          required: true
 *          description : The Sale ID
 *     requestBody:
 *       status : enable an existent sale
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
 *                   example: "SALE_ENABLED"
 *                 data:
 *                   $ref: "#/components/schemas/sale"
 *       404:
 *         description: The Sale was not found
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
 *                       example: "ERROR_ENABLED_SALE"
 */
router.patch(
  '/:SaleId/enable',
  verifySeller,
  validatorUpdateStatus,
  enableSale
);
/**
 * DISABLE SALE
 * @swagger
 * /sales/{SaleId}/disable:
 *   patch:
 *     summary: Disable an existing Sale
 *     tags: [Sales]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: SaleId
 *          schema:
 *             type: objectID
 *             format: string
 *          required: true
 *          description : The Sale ID
 *     requestBody:
 *       status : Disable an existent Sale
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *               type: object
 *               properties:
 *                status:
 *                   type: boolean
 *                   example: false
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
 *                   example: "SALE_DISABLED"
 *                 data:
 *                   $ref: "#/components/schemas/sale"
 *       404:
 *         description: The Sale was not found
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
 *                       example: "ERROR_DISABLED_SALE"
 */
router.patch(
  '/:SaleId/disable',
  verifySeller,
  validatorUpdateStatus,
  disableSale
);

export default router;
