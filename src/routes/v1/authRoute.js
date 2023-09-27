// import routerx
import routerx from "express-promise-router";
// Import Controller
import { singIn } from "../../controller/authController.js";

const router = routerx();

router.post("/sing-in", singIn);

export default router;
