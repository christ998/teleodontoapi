const { Router } = require('express')
const router = Router()

const { getTypes, getReviews, createReview, createReviewFile, getUrlFileByReviewId } = require('../controllers/review.controller')

router.route('/get/:personId')
    .get(getReviews)
router.route('/types')
    .get(getTypes)
router.route('/')
    .post(createReview)
router.route('/file')
    .post(createReviewFile)
router.route('/file/:prescription_id')
    .get(getUrlFileByReviewId)

module.exports = router