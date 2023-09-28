// import Routerx
import routerx from "express-promise-router";

// Import Routes
import categoryRoute from "./categoryRoute.js";
import articleRoute from "./articleRoute.js";
import userRoute from "./userRoute.js";
import authRoute from "./authRoute.js";
import personRoute from "./personRoute.js";
import receiptRoute from "./receiptRoute.js";

const router = routerx();

router.use("/api/v1/categories", categoryRoute);
router.use("/api/v1/articles", articleRoute);
router.use("/api/v1/users", userRoute);
router.use("/api/v1/auth", authRoute);
router.use("/api/v1/persons", personRoute);
router.use("/api/v1/receipts", receiptRoute);

export default router;
