const { sendResponse } = require('../utils/responseHandler')
const { mysql } = require('../_config/mysql')

const softTissuesExamCtrl = {}


softTissuesExamCtrl.getSoftTissuesExamById =  async (req, res) => {
    mysql.query(
        "SELECT * FROM soft_tissues_exam WHERE dental_anamnesis_id = ?;",
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


softTissuesExamCtrl.createSoftTissuesExam = async (req, res) => {
    const {
        dentalAnamnesisId, formId, length, width, height, colorId, surfaceId, consistencyId, evolutionTime,
        evolutionFromId, symptomatologyId, edgeId, localizationId, observation, position_x, position_y, position_z,
        orientation_x, orientation_y, orientation_z
    } = req.body

    mysql.query(
        
        "INSERT INTO soft_tissues_exam "+
        "(dental_anamnesis_id, form_id, length, width, height, color_id, surface_id, consistency_id, evolution_time, " +
        "evolution_form_id, symptomatology_id, edge_id, localization_id, observation, position_x, position_y, position_z, orientation_x, orientation_y, orientation_z) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ",
  
        [dentalAnamnesisId, formId, length, width, height, colorId, surfaceId, consistencyId, evolutionTime,
        evolutionFromId, symptomatologyId, edgeId, localizationId, observation, position_x, position_y, position_z,
        orientation_x, orientation_y, orientation_z],

        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

softTissuesExamCtrl.updateSoftTissuesExam = async (req, res) => {
    const {
        dentalAnamnesisId, formId, length, width, height, colorId, surfaceId, consistencyId, evolutionTime,
        evolutionFromId, symptomatologyId, edgeId, localizationId, observation, position_x, position_y, position_z,
        orientation_x, orientation_y, orientation_z, softTissuesExamId
    } = req.body

    mysql.query(
        
        "UPDATE soft_tissues_exam "+
        "SET dental_anamnesis_id = ?, form_id = ?, length = ?, width = ?, height = ?, color_id = ?, surface_id = ?, " +
        "consistency_id = ?, evolution_time = ?, evolution_form_id = ?, symptomatology_id = ?, edge_id = ?, localization_id = ?, " +
        "observation = ?, position_x = ?, position_y = ?, position_z = ? , orientation_x = ?, orientation_y = ?, orientation_z = ? " +
        "WHERE soft_tissues_exam_id = ? ",
  
        [dentalAnamnesisId, formId, length, width, height, colorId, surfaceId, consistencyId, evolutionTime,
        evolutionFromId, symptomatologyId, edgeId, localizationId, observation, position_x, position_y, position_z, 
        orientation_x, orientation_y, orientation_z, softTissuesExamId],

        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

softTissuesExamCtrl.deleteSoftTissuesExam = async (req, res) => {
    mysql.query(
        "DELETE FROM soft_tissues_exam WHERE soft_tissues_exam_id = ?",
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

module.exports = softTissuesExamCtrl