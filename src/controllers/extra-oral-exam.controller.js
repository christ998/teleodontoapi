const { sendResponse } = require('../utils/responseHandler')
const { mysql } = require('../_config/mysql')

const extraOralExamCtrl = {}


extraOralExamCtrl.getExtraOralExamById =  async (req, res) => {
    mysql.query(
        "SELECT * FROM extra_oral_exam WHERE dental_anamnesis_id = ?;",
        [req.params._id],
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
    }
    )
}


extraOralExamCtrl.createExtraOralExam = async (req, res) => {
    const {
        dentalAnamnesisId, inspection, palpation, position_x, position_y, position_z
    } = req.body

    mysql.query(
        
        "INSERT INTO extra_oral_exam "+
        "(dental_anamnesis_id, inspection, palpation, position_x, position_y, position_z)" +
        "VALUES (?, ?, ?, ?, ?, ?); ",
  
        [dentalAnamnesisId, inspection, palpation, position_x, position_y, position_z],

        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

extraOralExamCtrl.updateExtraOralExam = async (req, res) => {
    const {
        dentalAnamnesisId, inspection, palpation, position_x, position_y, position_z, extraOralExamId
    } = req.body

    mysql.query(
        
        "UPDATE extra_oral_exam "+
        "SET dental_anamnesis_id = ?, inspection = ?, palpation = ?, position_x = ?, position_y = ?, position_z = ? " +
        "WHERE extra_oral_exam_id = ? ",
  
        [dentalAnamnesisId,inspection, palpation, position_x, position_y, position_z,
        extraOralExamId],

        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

extraOralExamCtrl.deleteExtraOralExam = async (req, res) => {
    mysql.query(
        "DELETE FROM extra_oral_exam WHERE extra_oral_exam_id = ?",
        [req.params._id],
        function (error, result) {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

module.exports = extraOralExamCtrl