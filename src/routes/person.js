const { Router } = require('express')
const router = Router()
const auth = require('../_config/jwt')
const jwt = require("jsonwebtoken")

const {
    deleteThis, getAll, getById, updateSociodemographicData, createBasic, 
    createAddres, createInformedConsent, createTrigaeCovid, listPatient,
    deleteByRun, updatePerson, updatePatient, createPreMotivConsultation,
    updateTrigaeCovid, getPreMotivConsultation, getByRun, statePerson
} = require('../controllers/person.controller')

router.route('/trigae-covid19')
    .post(createTrigaeCovid)
router.route('/trigae-covid19/update')
    .post(updateTrigaeCovid)
router.route('/informed-consent')
    .post(createInformedConsent)
router.route('/address')
    .post(createAddres)
router.route('/pre-medical-consultation')
    .post(createPreMotivConsultation)
router.route('/pre-medical-consultation/:personId')
    .get(getPreMotivConsultation)
router.route('/sociodemographic-data')
    .post(updateSociodemographicData)
router.route('/')
    .get(getAll)
    .post(createBasic)
    .put(updatePerson)
router.route('/listpatient')
    .get(listPatient)
    // .get(auth, listPatient)
router.route('/:personId')
    .get(getById)
    // .delete(deleteThis)
    // .put(updatePatient)

router.route('/:run')
    .put(statePerson);

router.route('/run/:idrun')
    .get(getByRun)
    // .delete(deleteByRun)

module.exports = router;