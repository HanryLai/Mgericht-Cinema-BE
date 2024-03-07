import { Router } from 'express';
import UserController from '../../controllers/users/user.controller';
import { apiKey } from '../../middleware/auth/auth.check';
const userRouter = Router();

userRouter.use(apiKey)
userRouter.post('/registers', UserController.register);

export default userRouter;
