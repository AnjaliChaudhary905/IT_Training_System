import express from "express";
import protect from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";
import dashboardController from "./dashboard.controller.js";

const router = express.Router();

router.get(
    "/admin",
    protect,
    authorize("admin"),
    dashboardController.getAdminDashboard
);

export default router;