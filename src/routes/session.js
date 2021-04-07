const { Router } = require('express')
const router = Router()
const jwt = require("jsonwebtoken")

const {
    login, refresh, verify, verifyJWT, logout
} = require('../controllers/session.controller')

router.route('/login').post(login).get(verifyJWT)
router.route('/logout').post(logout)
router.route('').post(refresh)
router.route('/verify').post(verify)

module.exports = router