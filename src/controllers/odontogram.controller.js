const { sendResponse } = require('../utils/responseHandler')
const { mysql } = require('../_config/mysql')

const odontogramCtrl = {}


odontogramCtrl.createOdontogram = async (req, res) => {
    const {
        dentalAnamnesisId,  teethState,
    } = req.body
    var query = 
    "START TRANSACTION; " +
    
    "INSERT INTO odontogram "+
    "(dental_anamnesis_id) " +
    "VALUES (?); " +
 
    "SET @odontogram_id = LAST_INSERT_ID(); "

    Object.entries(teethState).map(([key, value], i) => (
        query +=
        "INSERT INTO odontogram_has_teeth (odontogram_id, teeth_id, teeth_state_id) " +
        "VALUES (@odontogram_id, " + value.teeth_id +","+ value.teeth_state_id +"); "
    ))

    query += "COMMIT;"

    mysql.query(
        query,
        [dentalAnamnesisId],

        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

odontogramCtrl.updateTeethState = async (req, res) => {
    const {
         odontogramId, teethState
    } = req.body
    
    var query = ""

    Object.entries(teethState).map(([key, value], i) => (
        query+=
     
        "UPDATE odontogram_has_teeth " +
        "SET teeth_state_id = " + value.teeth_state_id + " WHERE odontogram_has_teeth.odontogram_id = " + odontogramId + " " +
        " AND odontogram_has_teeth.teeth_id = (SELECT teeth_id FROM teeth WHERE fdi_name = " + value.fdi_name + "); "

    ))
    
    mysql.query(       
        query,
        [odontogramId, teethState],
        (error, result) => {
            if (error) {
                
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

odontogramCtrl.deleteOdontogram = async (req, res) => {
    mysql.query(
        "START TRANSACTION; " +
        "DELETE FROM odontogram_has_teeth WHERE odontogram_id = ? ; " +
        "DELETE FROM odontogram WHERE odontogram_id = ?; " +
        "COMMIT; ",
        [req.params_id, req.params_id],
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

odontogramCtrl.getLastOne =  async (req, res) => {
    const {dental_anamnesis_id} = req.params;
    mysql.query(

        "SELECT odontogram_id FROM odontogram od " +
        "WHERE od.dental_anamnesis_id = ? " +
        "AND od.odontogram_id = (SELECT MAX (odontogram_id) FROM odontogram WHERE dental_anamnesis_id = od.dental_anamnesis_id);",
        [dental_anamnesis_id],
        (error, result) => {
            
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
    }
    )
}

odontogramCtrl.getOdontogramHasTeeth = async (req, res) => {
    const {odontogram_id} = req.params;
    mysql.query(
        "SELECT t.fdi_name, teeth_state_id " +
        "FROM odontogram_has_teeth has JOIN teeth t ON has.teeth_id = t.teeth_id " +
        "JOIN odontogram o ON o.odontogram_id = has.odontogram_id " +
        "WHERE o.odontogram_id = ? ;",

        /* "SELECT te FROM odontogram_has_teeth WHERE odontogram_id = ? ; ", */
        [odontogram_id],
        function (error, result) {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", result);
            };
        }
    )
}


module.exports = odontogramCtrl