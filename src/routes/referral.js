const {Router} = require('express');
const router = Router();

const {getByPersonId, createBasic, updateBasic, setActive} = require('../controllers/referral.controller');

router.route('/')
    .post(createBasic);

router.route('/:person_id')
    .get(getByPersonId);

router.route('/:referral_id')
    .put(setActive)
    .post(updateBasic);

module.exports = router;