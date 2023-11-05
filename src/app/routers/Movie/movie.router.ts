import { Router } from 'express';

const router = Router();

/**
 * {user} can get information movie by id
 *        can get list movie coming soon,now showtime
 *
 * {admin} can post new movie
 *         can update information movie, update status movie
 *         can delete movie
 *         can find by name similar
 *         can find all movie
 */

// router for user
//[GET]
//router get movie by id
router.get('/:id');

//router get movie now showtime
router.get('/now');

//router get movie upcoming
router.get('/coming');

// router for admin
// [GET]
//router search get find by similar name movie
router.get('/:name');

//router get all movie
router.get('/');

// [POST]
//router create new movie
router.post('/');

// [PUT/PATCH]
//router update information movie
router.put('/:id');

//router update status movie
router.patch('/:id/status');

//DELETE
//router delete movie by id
router.delete('/:id');

module.exports = router;
