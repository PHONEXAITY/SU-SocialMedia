import { Router } from "express";
import postRoute from "./postRoute.js";
import authRoute from "./authRoute.js";
import userRoute from "./userRoute.js";
const router = Router();

router.use('/posts', postRoute);
router.use('/auth', authRoute);
router.use('/users', userRoute);

export default router;