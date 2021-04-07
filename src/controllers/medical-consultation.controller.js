const medicalConsCtrl = {}
const { sendResponse } = require('../utils/responseHandler')
const { mysql } = require('../_config/mysql')

medicalConsCtrl.getConsultationsByPersonId = async (req, res) => {
    const { personId } = req.params
    mysql.query(
        "SELECT * FROM medical_consultation WHERE person_id = ?; ",
        [personId], 
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

medicalConsCtrl.createConsultation = async (req, res) => {
    const { 
        personId, medicalConsStateId, description, medicalConstCategoryId, medicalConsSubCategoryId, 
        medicalConsDetailCategoryId, applicableForTeleconsultation, extraInfo, urgency
    } = req.body

    mysql.query(
        "INSERT INTO medical_consultation" + 
        "(person_id, medical_cons_state_id, description, medical_cons_category_id, " + 
        "medical_cons_sub_category_id, medical_cons_detail_category_id, applicable_for_teleconsultation, " + 
        "extra_info, urgency) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [personId, medicalConsStateId, description, medicalConstCategoryId, medicalConsSubCategoryId,
        medicalConsDetailCategoryId, applicableForTeleconsultation, extraInfo, urgency],
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

medicalConsCtrl.createAppointment = async (req, res) => {
    const { dateTime, medicalConsultationId } = req.body

    mysql.query(
        "INSERT INTO appointment (datetime, medicalConsultationId) " + 
        "VALUES (?, ?);",
        [dateTime, medicalConsultationId],
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

medicalConsCtrl.confirmAppointment = async (req, res) => {
    const { isConfirmed, confirmationOptionId } = req.body
    const { medicalConsultationId } = req.params

    mysql.query(
        "UPDATE appointment SET is_confirmed = ?, confirmation_option_id = ? " + 
        "WHERE medicalConsultationId = ?",
        [isConfirmed, confirmationOptionId, medicalConsultationId],
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

module.exports = medicalConsCtrl