const { Router } = require('express')
const {
    getLastOne,
    getOdontogramHasTeeth,
    createOdontogram,
    updateTeethState,
    deleteOdontogram } = require('../controllers/odontogram.controller')
const router = Router()



router.route('/')
    .post(createOdontogram)
    .put(updateTeethState)

router.route('/:dental_anamnesis_id')
    .get(getLastOne)
    

router.route('/teeth/:odontogram_id')
    .delete(deleteOdontogram)
    .get(getOdontogramHasTeeth)  
module.exports = router