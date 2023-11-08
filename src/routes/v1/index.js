// import Routerx
import routerx from 'express-promise-router';

// Import Routes
import categoryRoute from './category_route.js';
import articleRoute from './article_route.js';
import userRoute from './user_route.js';
import authRoute from './auth_route.js';
import personRoute from './person_route.js';
import receiptRoute from './receipt_route.js';
import saleRoute from './sale_route.js';

const router = routerx();

router.use('/api/v1/categories', categoryRoute);
router.use('/api/v1/articles', articleRoute);
router.use('/api/v1/users', userRoute);
router.use('/api/v1/auth', authRoute);
router.use('/api/v1/persons', personRoute);
router.use('/api/v1/receipts', receiptRoute);
router.use('/api/v1/sales', saleRoute);

export default router;
