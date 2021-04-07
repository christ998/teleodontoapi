const express = require("express");
const multer = require('multer')
const {upload, getFile} = require('../controllers/file.controller')
const router = express.Router()

const {subir} = require('../utils/uploadFile')

router.route('/:run')
    .post(subir.subirPdf.single("file"), upload) //Se recupera el modulo, se llama al metodo subirpdf, y se le pone single si es solo 1 archivo, más info en https://www.npmjs.com/package/multer

router.route('/review/:run')
    .post(subir.subirReview.single("file"), upload)

router.route('/img_medico/:run')
    .post(subir.imagesMG.single("file"), upload) 

router.route('/img_odonto/:run')
    .post(subir.imagesOG.single("file"), upload)  

router.route('/get/:url')
    .get(getFile)

module.exports = router


