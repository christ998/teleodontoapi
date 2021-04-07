const { Router } = require('express')
const {
    createExtraOralExam,
    updateExtraOralExam,
    deleteExtraOralExam,
    getExtraOralExamById 
} = require('../controllers/extra-oral-exam.controller')
const router = Router()


router.route('/')
    .post(createExtraOralExam)
    .put(updateExtraOralExam)

router.route('/:_id')
    .get(getExtraOralExamById)
    .delete(deleteExtraOralExam)

module.exports = router