import { Router } from 'express';
const router = Router();
import * as AdminController from '../../controllers/Users/admin.controller';
import { authMiddleware } from '../../middleware/auth/authMiddleware';
import { isAdmin } from '../../middleware/auth/isAdmin';

//ADMIN
// [GET] login for admin
router.get('/admin/login', AdminController.loginAdmin);
// [DELETE] delete user with id. only admin can do that
router.delete('/admin/:id/delete', authMiddleware, isAdmin, AdminController.deleteUser);
// [PUT] update user with di
router.put('/admin/:id/update', authMiddleware, isAdmin, AdminController.updateUser);
module.exports = router;
