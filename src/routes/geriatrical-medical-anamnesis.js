const { Router } = require('express')
const { 
    createGeriatricAnamnesis, updateGeriatricAnamnesis, getAllByPersonId, createEvaluations,
    getById, getLastOne, updateBasicMedicalAnamnesisU
} = require('../controllers/geriatrical-medical-anamnesis.controller')
const router = Router()

router.route('/get-all-by-person-id/:personId')
    .get(getAllByPersonId)
router.route('/get-by-id/:geriatricalAnamnesisId')
    .get(getById)
router.route('/')
    .post(createGeriatricAnamnesis)
router.route('/evaluations')
    .post(createEvaluations)    
router.route('/:geriatricalAnamnesisId')
    .post(updateGeriatricAnamnesis)

//RUTAS PARA CRUD########################################################
router.route('/crud')
    .put(updateBasicMedicalAnamnesisU);

router.route('/crud/:person_id')
    .get(getLastOne); 

module.exports = router;