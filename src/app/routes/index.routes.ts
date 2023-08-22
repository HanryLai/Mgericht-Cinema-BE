import { Router } from 'express';
const router = Router();
const UserRouter = require('./users/user.routes');
const AdminRouter = require('./users/admin.routes');
router.use('/api/users', UserRouter);
router.use('/api/users', AdminRouter);
module.exports = router;
