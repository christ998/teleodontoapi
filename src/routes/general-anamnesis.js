const { Router } = require('express')
const { createGeneralAnamnesis, deleteGeneralAnamnesis, getDiseases, getLastOne, updateBasicGeneralAnamnesisU, getPersonHasDisease, getAnamnesisData } = require('../controllers/general-anamnesis.cotroller')
const router = Router()

// router.route('/:generalAnamnesisId')
//     .delete(deleteGeneralAnamnesis)
router.route('/')
    .post(createGeneralAnamnesis)

//RUTAS PARA CRUD########################################################
router.route('/crud/:general_anamnesis_id')
    .get(getDiseases);   

router.route('/:person_id')
    .get(getLastOne); 

router.route('/crud')
    .post(updateBasicGeneralAnamnesisU);

router.route('/disease/:person_id')
    .get(getPersonHasDisease);

router.route('/data/:person_id')
    .get(getAnamnesisData);

module.exports = router;