const { response } = require("express")

const responseHandler = {}

sendResponse = 
async (res, error, resultCode, result, status = 200) => {
    var response = {
        error: error,
        resultCode: resultCode,
        result: result
    }
    
    console.log(response)
    res.status(status).json(response)
}

module.exports = { sendResponse }