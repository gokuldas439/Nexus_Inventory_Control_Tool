import { Router } from "express";
import * as adminControllers from "../controllers/admin/adminControllers";
import * as authMiddlewares from "../middlewares/authMiddleware";

const router = Router();

// add company.................................................

router.post('/login',authMiddlewares.protect('admin'),adminControllers.addCompany)

// add company.................................................

router.post('/addCompany',authMiddlewares.protect('admin'), adminControllers.addCompany)


export default router;