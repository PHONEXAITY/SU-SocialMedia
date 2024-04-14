import { Router } from "express";
import postRoute from "./postRoute.js";
import authRoute from "./authRoute.js";
import userRoute from "./userRoute.js";
import reactionRoute from "./reactionRoute.js";
import commentRoute from "./commentRoute.js";
import connectionRoute from "./connectRoute.js";
const router = Router();

router.use('/posts', postRoute);
router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/', reactionRoute);
router.use('/comments', commentRoute);
router.use('/connect', connectionRoute);

export default router;