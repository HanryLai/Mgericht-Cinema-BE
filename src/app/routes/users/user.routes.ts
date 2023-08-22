import { Router } from 'express';
const router = Router();
import * as UsersController from '../../controllers/Users/users.controller';
import { authMiddleware } from '../../middleware/auth/authMiddleware';
import { isAdmin } from '../../middleware/auth/isAdmin';
//USER
//[GET]
//login user
router.get('/login', UsersController.login);
// get all users
router.get('/allUsers', UsersController.getAllUsers);
// get user by id
router.get('/:id', UsersController.getUser);
//[POST]
//register
router.post('/register', UsersController.register);
//logout
router.post('/logout', authMiddleware, UsersController.logout);
//handle refresh token
router.post('/:id/refreshToken', UsersController.refreshToken);
//reset password when user cannot login

router.post('/forgetPassword', UsersController.forgetPassword);
//[PUT]
//update information user ONLY email,username,address,phone
router.put('/updateUser', authMiddleware, UsersController.updateUser);
//change password when user loged in
router.put('/changPassword', authMiddleware, UsersController.changePassword);

// SOME QUESTION
//// router.post('/:id/resetPassword', UsersController.resetPassword);
//block,unblock

module.exports = router;
