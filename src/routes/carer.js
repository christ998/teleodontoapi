const { Router } = require('express')
const router = Router()


const { getById, deleteThis, create } = require('../controllers/carer.controller')


router.route('/')
    .post(create)
router.route('/:_id')
    .get(getById)
    // .delete(deleteThis)

module.exports = router