const { Router } = require('express');
const router = Router();

const {getByPersonId, createBasic, updateBasic, setState} = require('../controllers/consultation-appointment.controller');

router.route('/')
    .post(createBasic);

router.route('/:person_id')
    .get(getByPersonId);

router.route('/:cons_appo_id')
    .put(setState)
    .post(updateBasic);

module.exports = router;