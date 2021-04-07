const { sendResponse } = require('../utils/responseHandler')
const { mysql } = require('../_config/mysql')

const generalAnamnesisCtrl = {}

generalAnamnesisCtrl.createGeneralAnamnesis = async (req, res) => {
    const {
        personId, allergies, otherDisease, underTreatment, previousSurgeries,
        medicineDose, medicineAllergies, radioChemoTherapy, selectedDiseases, consult_motive, consult_motive_history,
        medic_alert
    } = req.body

    var query = 
        "START TRANSACTION; " +

        "INSERT INTO general_anamnesis (allergies, other_disease, under_treatment, previous_surgeries, " +
        "medicine_dose, medicine_allergies, radio_chemo_therapy, person_id, consult_motive,consult_motive_history,medic_alert) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?); " +

        "SET @general_anamnesis_id = LAST_INSERT_ID(); "
    
        selectedDiseases.map(diseaseId => {
        query += 
        "INSERT INTO general_anamnesis_has_disease (general_anamnesis_id, disease_id) " +
        "VALUES (@general_anamnesis_id, " + diseaseId + "); " 
    })

    query += "COMMIT;"

    mysql.query(
        query, 
        [
            allergies, otherDisease, underTreatment, previousSurgeries, medicineDose,
            medicineAllergies, radioChemoTherapy, personId, consult_motive,consult_motive_history,medic_alert
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

// generalAnamnesisCtrl.deleteGeneralAnamnesis = async (req, res) => {
//     const { generalAnamnesisId } = req.params
//     mysql.query(
//         "START TRANSACTION; " +
        
//         "DELETE FROM general_anamnesis WHERE genenral_anamnesis_id = ?; " +
//         "DELETE FROM general_anamnesis_has_disease WHERE genenral_anamnesis_id = ?" +

//         "COMMIT; ",
//         [generalAnamnesisId, generalAnamnesisId],
//         (error, results) => {
//             if (error) {
//                 sendResponse(res, true, "TaskFailed", error)
//             } else {
//                 sendResponse(res, false, "Success", results)
//             }
//         }
//     )
// };

//CONTROLADORES PARA CRUD########################################################
generalAnamnesisCtrl.updateBasicGeneralAnamnesisU = async (req, res) => {
    const {general_anamnesis_id, allergies, other_disease, under_treatment, previous_surgeries, medicine_dose, medicine_allergies, radio_chemo_therapy, consult_motive, consult_motive_history, medic_alert, d} = req.body
    var query = 
        "START TRANSACTION; " +
        "SET @general_anamnesis_id = ?; " +
        "UPDATE general_anamnesis SET  allergies = ?, other_disease = ?, under_treatment = ?, previous_surgeries = ?, medicine_dose = ?, medicine_allergies = ?, radio_chemo_therapy = ?, consult_motive = ?, consult_motive_history = ?, medic_alert = ? " +
        "WHERE general_anamnesis_id = @general_anamnesis_id; " +
        "DELETE FROM general_anamnesis_has_disease WHERE general_anamnesis_id = @general_anamnesis_id; ";
        d.map(disease_id => {
            query += 
                 "INSERT INTO general_anamnesis_has_disease (general_anamnesis_id, disease_id) " +
                 "VALUES (@general_anamnesis_id, " + disease_id + "); ";
             }
         );
    query += "COMMIT; ";
    mysql.query(
        query, [general_anamnesis_id, allergies, other_disease, under_treatment, previous_surgeries, medicine_dose, medicine_allergies, radio_chemo_therapy, consult_motive, consult_motive_history, medic_alert],
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", results);
            };
        }
    );
};

generalAnamnesisCtrl.getDiseases = async (req, res) => {
    const {general_anamnesis_id} = req.params;
    mysql.query(
        "SELECT d.disease_id, IF(has.general_anamnesis_id IS NOT NULL, true, false) has_disease " +
        "FROM general_anamnesis_has_disease has " +
        "RIGHT JOIN disease d ON has.disease_id = d.disease_id AND has.general_anamnesis_id = ?;",
        [general_anamnesis_id],
        function (error, result) {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", result);
            };
        }
    );
};

generalAnamnesisCtrl.getPersonHasDisease = async (req, res) => {
    const {person_id} = req.params;
    mysql.query(
        "SELECT d.name " +
        "FROM general_anamnesis_has_disease has JOIN disease d ON has.disease_id = d.disease_id " +
        "JOIN general_anamnesis ga ON ga.general_anamnesis_id = has.general_anamnesis_id " +
        "WHERE ga.person_id = ?;",
        [person_id],
        function (error, result) {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", result);
            };
        }
    )
}

generalAnamnesisCtrl.getAnamnesisData = async (req, res) => {
    const {person_id} = req.params;
    mysql.query(
        "SELECT allergies, medicine_allergies, medicine_dose FROM general_anamnesis WHERE person_id = ?;",
        [person_id],
        function (error, result) {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", result);
            };
        }
    )
}

generalAnamnesisCtrl.getLastOne = async (req, res) => {
    const {person_id} = req.params;
    mysql.query(
        "SELECT * FROM general_anamnesis da " +
        "WHERE da.person_id = ? " +
        "AND da.general_anamnesis_id = (SELECT MAX(general_anamnesis_id) FROM general_anamnesis WHERE person_id = da.person_id);",
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

module.exports = generalAnamnesisCtrl;