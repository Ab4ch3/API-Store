// import routerx
import routerx from 'express-promise-router';
// Import Controller
import {
  getAllArticles,
  getArticle,
  getArticleByBarCode,
  createArticle,
  updateArticle,
  enableArticle,
  disableArticle,
  deleteArticle
} from '../../controllers/article_controller.js';
// Import Validator
import {
  validatorCreateArticle,
  validatorUpdateStatus
} from '../../middleware/validators/article_validator.js';
// Import middleware
import {
  verifyStoreKepper,
  verifyUserAuth
} from '../../middleware/auth_middleware.js';

const router = routerx();
/**
 * CREATE ARTICLE
 * @swagger
 * tags:
 *   name: Articles
 *   description: Everything about Articles
 * /articles:
 *   post:
 *     summary: Add a new Article to the store
 *     tags: [Articles]
 *     security:
 *       -  bearerAuth: []
 *     requestBody:
 *       description : Create a new Article
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            properties:
 *              category:
 *                   type: string
 *                   format: objectID
 *                   example: 64fbb9728d57ad39926f5ea1
 *              code:
 *                   type: string
 *                   example: 7591127363504323
 *              name:
 *                   type: string
 *                   example: laptop hp 14"
 *              description:
 *                   type: string
 *                   example: About Computes #4
 *              sell_price:
 *                   type: number
 *                   example: 150
 *              stock:
 *                   type: number
 *                   example: 30
 *              status:
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
 *                   example: "ARTICLE_CREATED"
 *                 data:
 *                  type: object
 *                  properties:
 *                   category:
 *                    type: string
 *                    example: 64fbb9728d57ad39926f5ea1
 *                   code:
 *                    type: string
 *                    example: "7591127363504323"
 *                   name:
 *                    type: string
 *                    example: "Testing"
 *                   description:
 *                    type: string
 *                    example: "Testing des"
 *                   sell_price:
 *                    type: number
 *                    example: 150
 *                   stock:
 *                    type: number
 *                    example: 10
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
 *                       example: "ERROR_CREATED_ARTICLE"
 *
 */
router.post('/', verifyStoreKepper, validatorCreateArticle, createArticle);
/** GET ALL ARTICLES
 * @swagger
 * /articles:
 *   get:
 *     summary: Lists all Articles  to the store
 *     tags: [Articles]
 *     security:
 *       -  bearerAuth: []
 *     responses:
 *       200:
 *         description: Lists all Articles
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
 *                      $ref: "#/components/schemas/article"
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
 *                       example: "ERROR_GET_ARTICLE"
 */
router.get('/', verifyStoreKepper, getAllArticles);
/**
 * GET AN ARTICLE BY CODE
 * @swagger
 * /articles/code:
 *   get:
 *     summary: Get an Article to the store by code
 *     tags: [Articles]
 *     security:
 *       -  bearerAuth: []
 *     requestBody:
 *       description : Get an Article by code
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            properties:
 *              code:
 *                   type: string
 *                   example: 7591127363504323
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
 *                   $ref: "#/components/schemas/article"
 *
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
 *                       example: "ERROR_GET_ARTICLE"
 *
 */
router.get('/code', verifyUserAuth, getArticleByBarCode);
/**
 * GET ARTICLES BY ID
 * @swagger
 * /articles/{ArticleId}:
 *   get:
 *     summary: Get an existing Article by ID
 *     tags: [Articles]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: ArticleId
 *          schema:
 *             type: string
 *             format: uuid
 *          required: true
 *          description : The Article ID
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
 *                      $ref: "#/components/schemas/article"
 *       404:
 *         description: The Article was not found
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
 *                       example: "ERROR_GET_ARTICLE"
 */
router.get('/:ArticleId', verifyStoreKepper, getArticle);
/**
 * UPDATE AN ARTICLE
 * @swagger
 * /articles/{ArticleId}:
 *   put:
 *     summary: Update an existing Article
 *     tags: [Articles]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: ArticleId
 *          schema:
 *             type: string
 *             format: uuid
 *          required: true
 *          description : The Article ID
 *     requestBody:
 *       description : Update an existent article
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            properties:
 *              category:
 *                   type: string
 *                   format: objectID
 *                   example: 64fbb9728d57ad39926f5ea1
 *              code:
 *                   type: string
 *                   example: 7591127363504323
 *              name:
 *                   type: string
 *                   example: laptop hp 14"
 *              description:
 *                   type: string
 *                   example: About Computes #4
 *              sell_price:
 *                   type: number
 *                   example: 150
 *              stock:
 *                   type: number
 *                   example: 30
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
 *                   example: "ARTICLE_UPDATED"
 *                 data:
 *                    $ref: "#/components/schemas/article"
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
router.put('/:ArticleId', verifyStoreKepper, updateArticle);
/**
 * DELETE CATEGORY
 * @swagger
 * /articles/{ArticleId}:
 *   delete:
 *     summary: Delete an existing Article
 *     tags: [Articles]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: ArticlesId
 *          schema:
 *             type: objectID
 *             format: string
 *          required: true
 *          description : The Article ID
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
 *                   example: "ARTICLE_DELETED"
 *                 data:
 *                     $ref: "#/components/schemas/article"
 *       404:
 *         description: The article was not found
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
 *                       example: "ERROR_DELETED_ARTICLE"
 */
router.delete('/:ArticleId', verifyStoreKepper, deleteArticle);
/**
 * ENABLE ARTICLE
 * @swagger
 * /categories/{ArticleId}/enable:
 *   patch:
 *     summary: Enable an existing article
 *     tags: [Articles]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: ArticleID
 *          schema:
 *             type: objectID
 *             format: string
 *          required: true
 *          description : The Article ID
 *     requestBody:
 *       status : enable an existent article
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
 *                   example: "ARTICLE_ENABLED"
 *                 data:
 *                   $ref: "#/components/schemas/article"
 *       404:
 *         description: The Article was not found
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
 *                       example: "ERROR_ENABLED_ARTICLE"
 */
router.patch(
  '/:ArticleId/enable',
  verifyStoreKepper,
  validatorUpdateStatus,
  enableArticle
);
/**
 * DISABLE ARTICLES
 * @swagger
 * /articles/{ArticleId}/disable:
 *   patch:
 *     summary: Disable an existing Article
 *     tags: [Articles]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *        - in: path
 *          name: ArticleId
 *          schema:
 *             type: string
 *             format: objectID
 *          required: true
 *          description : The Article ID
 *     requestBody:
 *       status : Disable an existent Article
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
 *                   example: "ARTICLE_DISABLED"
 *                 data:
 *                   $ref: "#/components/schemas/article"
 *
 *       404:
 *         description: The Article was not found
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
 *                       example: "ERROR_DISABLED_ARTICLE"
 */
router.patch(
  '/:ArticleId/disable',
  verifyStoreKepper,
  validatorUpdateStatus,
  disableArticle
);

export default router;
