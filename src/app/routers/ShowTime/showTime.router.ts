import { Router } from 'express';

const router = Router();

/**
 * {user}
 *      - get all showtime of movie
 *      - get showtime of movie on date
 *
 * {admin}
 *      - CUD showtime
 */

// router for user
// [GET ]
//get all showtime of movie
router.get('/:idMovie/all');
//get showtime of movie on date
router.get('/:idMovie/:date');

// router for admin

//[POST]
//admin can create new showtime
router.get('/:idMovie');
//[PUT/PATCH]
// admin can update showtime
router.put('/:idMovie/:idShowtime');

//[DELETE]
//admin can delete showtime
router.delete('/:idMovie/:idShowtime');

module.exports = router;
