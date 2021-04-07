const { Router } = require('express')
const router = Router()

const { 
    createConsultation, getConsultationsByPersonId, createAppointment, confirmAppointment 
} = require('../controllers/medical-consultation.controller')

router.route('/create-appointment/')
    .put(createAppointment)
router.route('/confirm-appointment/')
    .put(confirmAppointment)
router.route('/get-all-by-personid/:personId')
    .get(getConsultationsByPersonId)
router.route('/')
    .post(createConsultation)

module.exports = router