import { Router } from 'express';
import UserController from '../../controllers/users/user.controller';
const userRouter = Router();

userRouter.post('/registers', UserController.register);

export default userRouter;
