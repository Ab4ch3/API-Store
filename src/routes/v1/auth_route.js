// import routerx
import routerx from 'express-promise-router';
// Import Controller
import { singIn } from '../../controllers/auth_controller.js';

const router = routerx();
/**
 * SingIn USER
 * @swagger
 * tags:
 *   name: Auth
 *   description: Everything about Auth
 * /sing-in:
 *   post:
 *     summary: Login user into the system
 *     tags: [Auth]
 *     requestBody:
 *       description : Sing-in user into the system
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *                email:
 *                   type: string
 *                   example: testing@gmial.com
 *                password:
 *                   type: string
 *                   example: 12345534
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
 *                   $ref: "#/components/schemas/user"
 *                 Token:
 *                   type: string
 *                   example: 131231231223sdasdasdsgfsaddf
 *       403:
 *         description: error authentication
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
 *                       example: "USER_&_PASSWORD_ERROR"
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
 *                       example: "ERROR_SERVER"
 *
 */
router.post('/sing-in', singIn);

export default router;
