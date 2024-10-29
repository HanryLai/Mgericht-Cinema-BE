import { Router } from 'express';
import userRouter from './users/user.router';
const router = Router();

router.use('/api/users', userRouter);

export default router;
