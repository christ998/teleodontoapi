const { sendResponse } = require("../utils/responseHandler")
const { mysql } = require("../_config/mysql")

const geriatricalAnamnesisCtrl = {}

geriatricalAnamnesisCtrl.getAllByPersonId = async (req, res) => {
    const { personId } = req.params
    
    mysql.query(
        "SELECT * FROM geriatric_medical_anamnesis WHERE person_id = ?;",
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

geriatricalAnamnesisCtrl.getById = async (req, res) => {
    const { geriatricalAnamnesisId } = req.params

    mysql.query(
        "SELECT * FROM geriatric_medical_anamnesis WHERE geriatric_medical_anamnesis_id = ?;",
        [geriatricalAnamnesisId],
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

geriatricalAnamnesisCtrl.createGeriatricAnamnesis = async (req, res) => {
    const {
        personId, walkingSpeed, weight, height, bmi, bloodPressure, temperature,
        heartRate, oxygenSaturation, muscularStrength, glycemia, extraInfo
    } = req.body

    mysql.query(
        "INSERT INTO geriatric_medical_anamnesis " +
        "(person_id, walking_speed, weight, heigth, bmi, blood_pressure, temperature, " +
        "heart_rate, oxygen_saturation, muscular_strength, glycemia, extra_info, " +
        "created_at) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW()); ",
        [
            personId, walkingSpeed, weight, height, bmi, bloodPressure, temperature,
            heartRate, oxygenSaturation, muscularStrength, glycemia, extraInfo
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
geriatricalAnamnesisCtrl.createEvaluations = async (req, res) => {
    const {anamnId,folstein_value,pfeiffer_value,yesavage_value
    } = req.body

    mysql.query(
        "UPDATE geriatric_medical_anamnesis SET " +
        "pfeiffer_test=?, folestein_mmse=?, yesavage_test=? "+
        "WHERE geriatric_medical_anamnesis_id=?;",
        [pfeiffer_value,folstein_value,yesavage_value,anamnId
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

geriatricalAnamnesisCtrl.updateGeriatricAnamnesis = async (req, res) => {
    const {
        walkingSpeed, weight, height, bmi, bloodPressure, temperature,
        heartRate, oxygenSaturation, muscularStrength, glycemia, extraInfo, folesteinMmse,
        pfeifferTest, yessavageTest
    } = req.body

    const { geriatricalAnamnesisId } = req.params

    mysql.query(
        "UPDATE geriatric_medical_anamnesis SET " + 
        "walking_speed=?, weight=?, height=?, bmi=?, blood_pressure=?, " + 
        "temperature=?, heart=?, oxygen_saturation=?, muscular_strength=?, glycemia=?, " +
        "extra_info=?, folstein_mmse=?, pfeiffer_test=?, yesavage_test=?, updated_at=NOW()) " + 
        "WHERE geriatric_medical_anamnesis_id=?;",
        [
            walkingSpeed, weight, height, bmi, bloodPressure, temperature, heartRate, 
            oxygenSaturation, muscularStrength, glycemia, extraInfo, folesteinMmse, pfeifferTest,
            yessavageTest, geriatricalAnamnesisId
        ],
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
};

//CONTROLADORES PARA CRUD########################################################
geriatricalAnamnesisCtrl.updateBasicMedicalAnamnesisU = async (req, res) => {
    const {geriatric_medical_anamnesis_id, walking_speed, weight, heigth, bmi, blood_pressure, temperature, heart_rate, oxygen_saturation, muscular_strength, glycemia, extra_info, folestein_mmse, pfeiffer_test, yesavage_test} = req.body;
    mysql.query(
        "UPDATE geriatric_medical_anamnesis SET " + 
        "walking_speed = ?, weight = ?, heigth = ?, bmi = ?, blood_pressure = ?, temperature = ?, heart_rate = ?, oxygen_saturation = ?, muscular_strength = ?, glycemia = ?, extra_info = ?, folestein_mmse = ?, pfeiffer_test = ?, yesavage_test = ? " +
        "WHERE geriatric_medical_anamnesis_id = ?;",
        [walking_speed, weight, heigth, bmi, blood_pressure, temperature, heart_rate, oxygen_saturation, muscular_strength, glycemia, extra_info, folestein_mmse, pfeiffer_test, yesavage_test, geriatric_medical_anamnesis_id],
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", results);
            };
        }
    );
};

geriatricalAnamnesisCtrl.getLastOne = async (req, res) => {
    const {person_id} = req.params;
    mysql.query(
        "SELECT * FROM geriatric_medical_anamnesis da " +
        "WHERE da.person_id = ? " +
        "AND da.geriatric_medical_anamnesis_id = (SELECT MAX(geriatric_medical_anamnesis_id) FROM geriatric_medical_anamnesis WHERE person_id = da.person_id);",
        [person_id],
        function (error, result) {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", result);
            };
        }
    );
};

module.exports = geriatricalAnamnesisCtrl;