import { Router } from "express";
import postRoute from "./postRoute.js";
import authRoute from "./authRoute.js";
import userRoute from "./userRoute.js";
import reactionRoute from "./reactionRoute.js";
import commentRoute from "./commentRoute.js";
const router = Router();

router.use('/posts', postRoute);
router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/', reactionRoute);
router.use('/comments', commentRoute);

export default router;