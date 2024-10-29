import { Router } from 'express';

const router = Router();
/**
 * {employee}
 *      - get schedule of them
 *
 * {admin}
 *      - get all schedule working of employee still activity on a theater
 *      - get all schedule working of theater from date to date
 *      - admin can get schedule all employee still active of a theater
 *      - create/update/delete schedule working of theater
 *
 *      - add/remove/update employee to schedule of theater
 *      - post/update/delete confirm timeSheet user not working on this date
 *
 *
 */

//router for user
//[GET]
//can get schedule working of them
router.get('/me');

// router of admin
// [GET ]
//admin can get schedule other employee
router.get('/:idEmployee');

//admin can get schedule of theater from date to date
router.get('/:idTheater/date');

// admin can get schedule all employee still active of a theater
router.get('/:idTheater/employee');
//admin can get timesheet working at a theater
router.get('/:idTheater');
//[POST]
// admin can create new schedule in a theater
router.post('//:idTheater');

// admin can add employee into schedule of theater
router.post('/:idSchedule/:idTheater');

// post confirm timeSheet user not working on this date
router.post('/:idTheater/:idEmployee/notWorking');

//[PUT/PATCH]
// admin can update schedule in a theater
router.patch('/:idTheater');

// admin can update employee at schedule of theater
router.patch('/:idSchedule/:idTheater/:idEmployee');

// update confirm timeSheet employee not working on this date
router.patch('/:idTheater/:idEmployee/notWorking');

//[DELETE]

// admin can delete schedule in a theater
router.delete('/:idTheater');

// admin can delete employee at schedule of theater
router.delete('/:idSchedule/:idTheater/:idEmployee');

// delete confirm timeSheet employee not working on this date
router.delete('/:idTheater/:idEmployee/notWorking');

module.exports = router;
