const { Router } = require('express')
const router = Router()
const {stateUser, getAll, createUser,  updateUser, getUserMedicalArea, postUserMedicalArea, deleteUserMedicalArea, getUserProfessional} = require('../controllers/user.controller')

router.route('/')
    .get(getAll)
    .post(createUser)
    .put(updateUser);
router.route('/:run')
    .put(stateUser);

router.route('/user-medical-area/:user_id')
    .get(getUserMedicalArea);
router.route('/user-medical-area')
    .post(postUserMedicalArea);
router.route('/user-medical-area/:user_medical_area_id')
    .delete(deleteUserMedicalArea);

router.route('/user-professional')
    .get(getUserProfessional);    
module.exports = router;