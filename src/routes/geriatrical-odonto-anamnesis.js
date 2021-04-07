const {Router} = require('express')
const {creteBasicDentalAnamnesis,createBackground, createMuscularExam, getDiagAndTreatment, getLastOne, creteBasicDentalAnamnesisU,
    createPeriodontograma} = require('../controllers/dental-anamnesis.controller')
const router = Router()

router.route('/')
    .post(creteBasicDentalAnamnesis)

router.route('/background')
    .post(createBackground)

router.route('/muscular-exam')
    .post(createMuscularExam)

router.route('/diag-treat/:personId')
    .get(getDiagAndTreatment)

router.route('/periodontograma')
    .post(createPeriodontograma)
//RUTAS PARA CRUD########################################################
router.route('/crud/:person_id')
    .get(getLastOne);    

router.route('/crud')
    .post(creteBasicDentalAnamnesisU)

module.exports = router