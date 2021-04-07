const { sendResponse } = require('../utils/responseHandler');
const { mysql } = require('../_config/mysql')



const contactCtrl = {}


contactCtrl.getById = async (req, res) => {
    mysql.query(
        "SELECT * FROM contact_info WHERE contact_id = ?",
        [req.params._id],
        function (error, result) {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    );

}

contactCtrl.getByPersonId = async (req, res) => {
    mysql.query(
        "SELECT * FROM contact_info WHERE person_id = ?",
        [req.params._id],
        function (error, result) {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    );

}

contactCtrl.update = async (req, res) => {
    const { phone, cellphone, email } = req.body
    mysql.query(
        "UPDATE contact_info SET phone = ?, cellphone = ?, email = ? WHERE contact_id = ?",
        [phone, cellphone, email, req.params._id],
        function (error, result) {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

module.exports = contactCtrl