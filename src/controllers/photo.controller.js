const { sendResponse } = require("../utils/responseHandler")
const { mysql } = require("../_config/mysql")
const fs = require('fs');

const photoAnamMedCtrl = {}

photoAnamMedCtrl.photoMedico = async (req, res) => {
    const { anamnId,nombreImagen,ruta } = req.body

    mysql.query(
        "INSERT INTO foto (url,foto_nombre) " +
        "VALUES (?, ?); " +
        "SET @anam_id = LAST_INSERT_ID(); "+
        "INSERT INTO geriatric_medical_anamnesis_has_foto (foto_id,geriatric_medical_anamnesis_id)" +
        "VALUES (@anam_id,?);",
        [ruta, nombreImagen,anamnId],
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

photoAnamMedCtrl.photoOdonto = async (req, res) => {
    const { anamnId,nombreImagen,ruta } = req.body

    mysql.query(
        "INSERT INTO foto (url,foto_nombre) " +
        "VALUES (?, ?); " +
        "SET @anam_id = LAST_INSERT_ID(); "+
        "INSERT INTO dental_anamnesis_has_foto (dental_anamnesis_id,foto_id)" +
        "VALUES (?,@anam_id);",
        [ruta, nombreImagen,anamnId],
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

photoAnamMedCtrl.obtainPhotoMedico = async (req, res) => {
    const { anamnId } = req.body

    mysql.query(
        "SELECT f.url, f.foto_nombre,f.foto_id FROM geriatric_medical_anamnesis_has_foto has " +
        "JOIN foto f ON has.foto_id = f.foto_id " +
        "WHERE has.geriatric_medical_anamnesis_id = ?;",
        [anamnId],
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

photoAnamMedCtrl.obtainPhotoOdonto = async (req, res) => {
    const { anamnId } = req.body

    mysql.query(
        "SELECT f.url, f.foto_nombre,f.foto_id FROM dental_anamnesis_has_foto has " +
        "JOIN foto f ON has.foto_id = f.foto_id "+
        "WHERE has.dental_anamnesis_id = ?;",
        [anamnId],
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

photoAnamMedCtrl.deletePhotoMedico = async (req, res) => {
    const {fId, route} = req.body
    mysql.query(
        "START TRANSACTION;" +
        "SET @fId = ?;" +
        "DELETE FROM foto WHERE foto_id = @fId;" +
        "DELETE FROM geriatric_medical_anamnesis_has_foto WHERE foto_id = @fId;" +
        "COMMIT;",
        [fId],
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                fs.unlink('src/public/images_anam_medico/' + route, (err) => {
                    if (err) {
                        sendResponse(res, true, "TaskFailed", err)
                    } else {
                        sendResponse(res, false, "Success", result)
                    }
                });
            }
        }
    )
}

photoAnamMedCtrl.deletePhotoOdonto = async (req, res) => {
    const {fId, route} = req.body
    mysql.query(
        "START TRANSACTION;" +
        "SET @fId = ?;" +
        "DELETE FROM foto WHERE foto_id = @fId;" +
        "DELETE FROM dental_anamnesis_has_foto WHERE foto_id = @fId;" +
        "COMMIT;",
        [fId],
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                fs.unlink('src/public/images_anam_odonto/' + route, (err) => {
                    if (err) {
                        sendResponse(res, true, "TaskFailed", err)
                    } else {
                        sendResponse(res, false, "Success", result)
                    }
                });
            }
        }
    )
}

module.exports = photoAnamMedCtrl