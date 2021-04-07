const { Router } = require('express')
const router = Router()


const {getById, update} = require('../controllers/contact.controller')

router.route('/:_id')
.get(getById)
.put(update)

module.exports = router