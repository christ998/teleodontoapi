const { sendResponse } = require('../utils/responseHandler');
const fileCtrl = {}
const multer = require('multer')

fileCtrl.upload = (req, res) => {
    res.send("Uploaded")
}

fileCtrl.getFile = (req, res) => {
    const {url} = req.params
    console.log(req.params)
    res.sendFile(url); 
}

module.exports = fileCtrl