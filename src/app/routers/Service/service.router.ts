import { Router } from 'express';

const router = Router();
/**
 * {user}
 *      - get all service sale now
 *      - get service type (drink,food,combo)
 * {admin}
 *      - get all service
 *      - find service by name,not sale
 *      - create new service
 *      - update information service, update quantity/price service by id
 *      - delete service
 *
 */

// router for user
// [GET ]

// user can get all service base on type
router.get('/:type');
//user can get service by id

// router for admin
// [GET ]

//get service similar name
router.get('/:name');

//get service by id
router.get('/:id');

//get all service still sale
router.get('/');

//[POST]
// admin can create new service
router.post('/');

// [PUT ]
//admin can update quantity service
router.patch('/:id/quantity');

//admin can update price service
router.patch('/:id/price');

//admin can update information service
router.patch('/:id/information');
//[DELETE]
// admin can delete service
router.delete('/:id');

module.exports = router;
