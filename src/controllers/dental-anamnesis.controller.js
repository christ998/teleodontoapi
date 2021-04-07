const { sendResponse } = require("../utils/responseHandler")
const { mysql } = require("../_config/mysql")

const dentalAnamnesisCtrl = {}

dentalAnamnesisCtrl.creteBasicDentalAnamnesis = async (req, res) => {
    const { anamId, defreal,ausenciaEncia,recesionesGingivales,posicionAberrante,
        profundidad,other,parcialTeeth,totalTeeth,parcialRemovableProstheses,totalRemovableProstheses,
        fixedProstheses,fixedProsthesesImplants,prosthesesMaterial,icdas2Index,cpodIndex
        } = req.body

    mysql.query(
        "UPDATE dental_anamnesis  SET defreal = ?, ausencia_encia = ?, recesiones_gingivales = ?, posicion_aberrante = ?, "+
        "profundidad = ?, other_mucogingival_alteration = ?, parcial_teeth = ?, total_teeth = ?, "+
        "parcial_removable_prostheses = ?, total_removable_prostheses = ?,fixed_prostheses= ?, fixed_prostheses_implants=?, prostheses_material= ? ,"+
        "icdas2_index = ?, cpod_index = ? "+
        "WHERE dental_anamnesis_id= ?",
        [defreal,ausenciaEncia,recesionesGingivales ,posicionAberrante,
            profundidad,other,parcialTeeth,
            totalTeeth,parcialRemovableProstheses,totalRemovableProstheses,fixedProstheses,fixedProsthesesImplants,prosthesesMaterial,
            icdas2Index,cpodIndex,
            anamId],
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

dentalAnamnesisCtrl.createBackground = async (req,res) =>{
    const { personId, alcohol,lastTime,drugs,smoke,smokeCuantity,badHabits,bruxismo } = req.body

    mysql.query(
        "INSERT INTO dental_anamnesis (person_id,alcohol, last_dental_visit,drugs,tabacco,tabacco_cuantity,other_bad_habit,bruxism) " +
        "VALUES (?, ?, ?, ? ,? ,? ,? ,?); ",
        [personId, alcohol,lastTime,drugs,smoke,smokeCuantity,badHabits,bruxismo],
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )   
}

dentalAnamnesisCtrl.createMuscularExam = async (req,res) =>{
    const {anamId,painpr,painfr,clickr,crepr,
        painpl,painfl,clickl,crepl,
        maseterod,maseteroi,temporald,temporali,
        pterigoideoInternoi,pterigoideoInternod,pterigoideoExternoi,pterigoideoExternod,
        musculosCuello,bloqueoAr,diagnostico,observaciones}=req.body

    mysql.query(
        "UPDATE dental_anamnesis SET painpr = ?, painfr = ?, clickr = ?, crepr = ?, "+
        "painpl = ?, painfl = ?, clickl = ?, crepl = ?," +
        "masetero_d = ?, masetero_i = ?, temporal_d = ?, temporal_i = ?, "+
        "pterigoideo_internoi = ?, pterigoideo_internod = ?, pterigoideo_externoi = ?, pterigoideo_externod = ?,"+
        "neck_muscles = ?, bloqueo_ar = ?, diag = ?, obs = ? "+
        "WHERE dental_anamnesis_id = ?",
        [painpr,painfr,clickr,crepr,
        painpl,painfl,clickl,crepl,
        maseterod,maseteroi,temporald,temporali,
        pterigoideoInternoi,pterigoideoInternod,pterigoideoExternoi,pterigoideoExternod,
        musculosCuello,bloqueoAr,diagnostico,observaciones,
        anamId],
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}  

dentalAnamnesisCtrl.createPeriodontograma = async (req,res) =>{
    const {anamId,periodontalDiagnosis,odontologicalDiagnosis,treatmentPlan
        }=req.body

    mysql.query(
        "UPDATE dental_anamnesis SET periodontal_diag = ?, odontological_diag = ?, treatment_plan= ?"+
        "WHERE dental_anamnesis_id = ?",
        [periodontalDiagnosis,odontologicalDiagnosis,treatmentPlan,
        anamId],
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}  

dentalAnamnesisCtrl.getDiagAndTreatment = async (req, res) => {
    mysql.query(
        "SELECT da.odontological_diag, da.treatment_plan FROM dental_anamnesis da WHERE da.person_id = ?;",
        [req.params.personId],
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

//CONTROLADORES PARA CRUD########################################################
dentalAnamnesisCtrl.creteBasicDentalAnamnesisU = async (req, res) => {
    const {dental_anamnesis_id, person_id, /**/last_dental_visit, alcohol, drugs, tabacco, tabacco_cuantity, other_bad_habit, bruxism, /**/painpr, painfr, clickr, crepr, painpl, painfl, clickl, crepl, masetero_d, masetero_i, temporal_d, temporal_i, pterigoideo_internoi, pterigoideo_internod, pterigoideo_externoi, pterigoideo_externod, neck_muscles, bloqueo_ar, diag, obs, /**/parcial_teeth, total_teeth, parcial_removable_prostheses, total_removable_prostheses, fixed_prostheses, fixed_prostheses_implants, prostheses_material, defreal, ausencia_encia, recesiones_gingivales, posicion_aberrante, profundidad, other_mucogingival_alteration, periodontal_diag, odontological_diag, treatment_plan, icdas2_index, cpod_index} = req.body;
    mysql.query("call sp_dental_anamnesis(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [dental_anamnesis_id, person_id, /**/ last_dental_visit, alcohol, drugs, tabacco, tabacco_cuantity, other_bad_habit, bruxism, /**/ painpr, painfr, clickr, crepr, painpl, painfl, clickl, crepl, masetero_d, masetero_i, temporal_d, temporal_i, pterigoideo_internoi, pterigoideo_internod, pterigoideo_externoi, pterigoideo_externod, neck_muscles, bloqueo_ar, diag, obs, /**/parcial_teeth, total_teeth, parcial_removable_prostheses, total_removable_prostheses, fixed_prostheses, fixed_prostheses_implants, prostheses_material, defreal, ausencia_encia, recesiones_gingivales, posicion_aberrante, profundidad, other_mucogingival_alteration, periodontal_diag, odontological_diag, treatment_plan, icdas2_index, cpod_index],
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", results);
            };
        }
    );
};

dentalAnamnesisCtrl.getLastOne = async (req, res) => {
    const {person_id} = req.params;
    mysql.query(
        "SELECT * FROM dental_anamnesis da " +
        "WHERE da.person_id = ? " +
        "AND da.dental_anamnesis_id = (SELECT MAX(dental_anamnesis_id) FROM dental_anamnesis WHERE person_id = da.person_id);",
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

module.exports = dentalAnamnesisCtrl