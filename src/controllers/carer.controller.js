const { sendResponse } = require('../utils/responseHandler');
const { mysql } = require('../_config/mysql')



const carerCtrl = {}


carerCtrl.create = async (req, res) => {
    const {
        personId, names, lastnames, phone, cellphone,
        email
    } = req.body

    mysql.query(
        "START TRANSACTION; " +

        "INSERT INTO contact_info (phone, cellphone, email) " + 
        "VALUES (?, ?, ?); " +

        "SET @contact_info_id = LAST_INSERT_ID(); " +

        "INSERT INTO carer (names, lastnames, contact_id) " +
        "VALUES (?, ?, @contact_info_id); " + 

        "SET @carer_id = LAST_INSERT_ID(); " +

        "UPDATE person SET carer_id = @carer_id WHERE person_id = ?; " +

        "COMMIT;",
        [
            phone, cellphone, email, names, lastnames,
            personId
        ],
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

carerCtrl.getById = async (req, res) => {
    mysql.query(
        "SELECT * FROM carer WHERE carer_id = ?",
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

// carerCtrl.deleteThis = async (req, res) => {
//     mysql.query(
//         "DELETE FROM carer WHERE carer_id = ?",
//         [req.params._id],
//         function (error, result) {
//             if (error) {
//                 sendResponse(res, true, "TaskFailed", error)
//             } else {
//                 sendResponse(res, false, "Success", result)
//             }
//         }
//     )
// }

module.exports = carerCtrl