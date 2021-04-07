const { Router } = require('express')
const {
    createSoftTissuesExam,
    updateSoftTissuesExam,
    deleteSoftTissuesExam,
    getSoftTissuesExamById
 } = require('../controllers/soft-tissues-exam.controller')
const router = Router()


router.route('/')
    .post(createSoftTissuesExam)
    .put(updateSoftTissuesExam)

router.route('/:_id')
    .get(getSoftTissuesExamById)
    .delete(deleteSoftTissuesExam)

module.exports = router