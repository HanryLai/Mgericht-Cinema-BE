import { Router } from 'express';

const router = Router();

/**
 * user
 *      - get all theater
 *      - get information theater by id
 * admin
 *      - post,update,delete theater
 *
 *
 */

// [GET]
// get all theater
router.get('/all');

//get theater by id
router.get('/:id');

// [POST]
// admin can create new theater
router.post('/');

// [PUT ]
// admin can update theater
router.put('/:id');

// [DELETE ]
// admin can delete theater
router.delete('/:id');

module.exports = router;
