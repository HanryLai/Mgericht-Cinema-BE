import { Router } from 'express';

const router = Router();

/**
 * {user}
 *      - create new order
 *      - get detail order by id
 *      - get all order of themselves
 * {admin}
 *      - get order another user
 * {system}
 *      - update status payment
 *
 */

// router for user
// [GET]
// user can get detail order themselves by id
router.get('/:idOrder');

// user can get all order of them
router.get('/me');

//[POST]
// user can pay order
router.get('/payment');

// Booking ticket
/**
 * call api
 * 1/get movie now
 * 2/get theater + showtime (date) + typeScreen  in this show time
 * 3/get seat in showtime
 * 4/get service (combo/drink or food)
 * 5/use API VNPay to payment (MOMO/BANKING) => true or false => (true)?post new order?:return error
 */

//router for admin
// [GET ]
//get order other user
router.get('/:idUser');

module.exports = router;
