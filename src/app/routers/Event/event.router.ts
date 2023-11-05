import { Router } from 'express';
const router = Router();

/*
    {event} {participant} was POST/PUT/DELETE by admin 
    {event} information GET by all user
    admin can get a all participants or one {participant}

*/
// [GET]
// all user can get information event
router.get('/:id');
// get all participant of one event
router.get('/:id/participants');
//get specify participant
router.get('/:idEvent/participants/:idParticipant');

//[POST]
// event was create by admin
router.post('/create');

//add one participant by admin
router.post('/:id/participant');
//[PUT]
//event was update by admin
router.put('/:id');

//update information participant by admin
router.put('/:idEvent/participants/:idParticipant');

//[DELETE]
//event was deleted by admin
router.delete('/:id');
//participant was deleted by admin
router.delete('/:idEvent/participants/:idParticipant');

module.exports = router;
