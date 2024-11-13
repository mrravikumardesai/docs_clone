import express, { Router } from "express";
import docsRoutes from "./docs_routes"
const router: Router = express.Router();

router.use("/docs", docsRoutes)

export default router