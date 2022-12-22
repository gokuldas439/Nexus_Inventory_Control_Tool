import { Router } from "express";
const router = Router();
import * as adminControllers from "../controllers/admin/adminControllers";



router.post('/login',adminControllers.userLogin)


export default router;