const {Router} = require('express')
const router = Router()

const {getByRun} = require('../controllers/consultation-appointment.controller')
const {getPersonByRun} = require('../controllers/person.controller')
const {getPrescriptionByRun, getUrlFileByReviewId} = require('../controllers/review.controller')
const {verify, refresh, loginMobile} = require('../controllers/session.controller')

router.route('/:run')
    .get(getPersonByRun);
router.route('/consultation-appointment/:run')
    .get(getByRun);
router.route('/prescription/:run')
    .get(getPrescriptionByRun);
router.route('/prescription-file/:prescription_id')
    .get(getUrlFileByReviewId);

router.route('/login')
    .post(loginMobile)
router.route('/refresh')
    .post(refresh)
router.route('/verify')
    .post(verify)

module.exports = router