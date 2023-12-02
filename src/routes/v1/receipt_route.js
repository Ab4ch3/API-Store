// import routerx
import routerx from 'express-promise-router';
// Import Controller
import {
  getAllReceipt,
  getReceipt,
  createReceipt,
  enableReceipt,
  disableReceipt,
  getGraph12Months,
  getCheckDates
} from '../../controllers/receipt_controller.js';
// Import Validator
import {
  validatorCreateReceipt,
  validatorUpdateStatus
} from '../../middleware/validators/receipt_validator.js';
// Import middleware
import {
  verifyStoreKepper,
  verifyUserAuth
} from '../../middleware/auth_middleware.js';

const router = routerx();

/**
 * CREATE RECEIPTS
 * @swagger
 * tags:
 *   name: Persons
 *   description: Everything about Persons
 * /receipts:
 *   post:
 *     summary: Add a new Receipt into the System
 *     tags: [Receipts]
 *     security:
 *       -  bearerAuth: []
 *     requestBody:
 *       description : Create a new Receitp
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
 *              document_num:
 *                   type: string
 *                   example: 124124124
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
 *                   example: "RECEIPT_CREATED"
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
 *                   document_num:
 *                    type: string
 *                    example: 124124124
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
 *                       example: "ERROR_CREATED_RECEIPT"
 *
 */
router.post('/', verifyStoreKepper, validatorCreateReceipt, createReceipt);
/** GET ALL RECEIPTS
 * @swagger
 * /receipts:
 *   get:
 *     summary: Lists all Receipts into the system
 *     tags: [Receipts]
 *     security:
 *       -  bearerAuth: []
 *     responses:
 *       200:
 *         description: Lists all Receipts
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
 *                      $ref: "#/components/schemas/receipt"
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
 *                       example: "ERROR_GET_RECEIPTS"
 */
router.get('/', verifyStoreKepper, getAllReceipt);
/** GET GRAPH RECEIPTS
 * @swagger
 * /receipts/graph12:
 *   get:
 *     summary: Lists Graph Receipts into the system
 *     tags: [Receipts]
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
 *                   example: RECEIPTS_GRAPH_12_MONTHS
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
 * GET RECEIPT BY ID
 * @swagger
 * /receipts/{ReceiptId}:
 *   get:
 *     summary: Get an existing Receipt by ID
 *     tags: [Receipts]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: ReceiptId
 *          schema:
 *             type: string
 *             format: uuid
 *          required: true
 *          description : The Receipt ID
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
 *                      $ref: "#/components/schemas/receipt"
 *       404:
 *         description: The Receipt was not found
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
 *                       example: "ERROR_GET_RECEIPT"
 */
router.get('/:ReceiptId', verifyStoreKepper, getReceipt);
/**
 * ENABLE RECEIPT
 * @swagger
 * /receipts/{ReceiptId}/enable:
 *   patch:
 *     summary: Enable an existing Receipt
 *     tags: [Receipts]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: ReceiptId
 *          schema:
 *             type: objectID
 *             format: string
 *          required: true
 *          description : The Receipt ID
 *     requestBody:
 *       status : enable an existent receipt
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
 *                   example: "RECEIPT_ENABLED"
 *                 data:
 *                   $ref: "#/components/schemas/receipt"
 *       404:
 *         description: The Receipt was not found
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
 *                       example: "ERROR_ENABLED_RECEIPT"
 */
router.patch(
  '/:ReceiptId/enable',
  verifyStoreKepper,
  validatorUpdateStatus,
  enableReceipt
);
/**
 * DISABLE RECEIPT
 * @swagger
 * /categories/{ReceiptId}/disable:
 *   patch:
 *     summary: Disable an existing Receipt
 *     tags: [Receipts]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: ReceiptId
 *          schema:
 *             type: objectID
 *             format: string
 *          required: true
 *          description : The Receipt ID
 *     requestBody:
 *       status : Disable an existent article
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
 *                   example: "RECEIPT_DISABLED"
 *                 data:
 *                   $ref: "#/components/schemas/receipt"
 *       404:
 *         description: The Receipt was not found
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
 *                       example: "ERROR_DISABLED_RECEIPT"
 */
router.patch(
  '/:ReceiptId/disable',
  verifyStoreKepper,
  validatorUpdateStatus,
  disableReceipt
);

export default router;
