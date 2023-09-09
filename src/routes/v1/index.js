// import Routerx
import routerx from "express-promise-router";

// Import Routes
import categoryRoute from "./categoryRoute.js";
import articleRoute from "./articleRoute.js";

const router = routerx();

router.use("/api/v1/categories", categoryRoute);
router.use("/api/v1/articles", articleRoute);

export default router;
