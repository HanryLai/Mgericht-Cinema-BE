import { Router } from 'express';

const router = Router();

/**
 * {user}
 *      - get voucher if it for them
 * {admin}
 *      - post,update,delete voucher
 *
 */
// router for user
//[GET]
//router user can get voucher for them
router.get('/me');

//router for admin
//[GET]
//router admin can get all voucher still valid
router.get('/valid');

//router admin can get voucher by name
router.get('/:name');

//router admin can get all voucher
router.get('/all');

// [POST ]
// router admin can create new voucher
router.post('/');

//[UPDATE]
//router admin can update voucher by id
router.put('/:id');

// [DELETE ]
//router admin can delete voucher
router.delete('/:id');

module.exports = router;
