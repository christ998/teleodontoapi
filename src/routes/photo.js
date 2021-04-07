const { Router } = require('express')
const router = Router()

const {photoMedico,photoOdonto,obtainPhotoMedico,obtainPhotoOdonto, deletePhotoMedico, deletePhotoOdonto } = require('../controllers/photo.controller')

router.route('/medico_geriatra')
    .post(photoMedico)
router.route('/medico_geriatra/obtain')
    .post(obtainPhotoMedico)
router.route('/medico_geriatra/rm')
    .post(deletePhotoMedico)
router.route('/odonto_geriatra')
    .post(photoOdonto)
router.route('/odonto_geriatra/obtain')
    .post(obtainPhotoOdonto)
router.route('/odonto_geriatra/rm')
    .post(deletePhotoOdonto)

module.exports = router