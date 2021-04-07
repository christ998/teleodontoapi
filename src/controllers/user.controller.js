const { sendResponse } = require("../utils/responseHandler")
const { mysql } = require("../_config/mysql")
const bcrypt = require('bcrypt')

const userCtrl = {}

userCtrl.stateUser = async (req, res) => {
    const { run } = req.params;
    mysql.query(
        "START TRANSACTION; " +
        "UPDATE user SET is_active = !is_active WHERE run = ?;" +
        "COMMIT;",
        [run],
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", result);
            };
        }
    );
};

userCtrl.getAll = async (req, res) => {
    mysql.query(
        "SELECT u.user_id, u.run, u.names, u.lastnames, u.email, u.user_type_id, t.name role, CONCAT(u.names, ' ', u.lastnames) fullname " +
        "FROM user u INNER JOIN user_type t ON u.user_type_id = t.user_type_id " +
        "WHERE u.is_active = 1 " +
        "ORDER BY u.user_id ASC;",
        function (error, result) {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", result);
            };
        }
    );
};

userCtrl.updateUser = async (req, res) => {
    const {user_id, run, names, lastnames, email, user_type_id} = req.body;
    const passwordEncrypted = "";
    mysql.query("call sp_user(?, ?, ?, ?, ?, ?, ?);",
        [user_id, run, passwordEncrypted, names, lastnames, email, user_type_id],
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", result);
            };
        }
    );
};

userCtrl.createUser = async (req, res) => {
    const {user_id, run, names, lastnames, email, user_type_id} = req.body;
    var passLimpia = run.replace('-',"");
    //const passwordEncrypted = bcrypt.hashSync(passLimpia, 10);
    const passwordEncrypted = bcrypt.hashSync(passLimpia, 10);
    mysql.query("call sp_user(?, ?, ?, ?, ?, ?, ?);",
        [user_id, run, passwordEncrypted, names, lastnames, email, user_type_id],
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", results);
            };
        }
    );
};

userCtrl.deleteUserMedicalArea = async (req,res) => {
    const {user_medical_area_id} = req.params;
    mysql.query(
        "START TRANSACTION; " +
        "DELETE FROM user_medical_area WHERE user_medical_area_id = ?; " +
        "COMMIT;",
        [user_medical_area_id],
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", result);
            };
        }
    );
};

userCtrl.postUserMedicalArea = async (req, res) => {
    const {user_id, medical_area_id} = req.body;
    mysql.query(
        "INSERT INTO user_medical_area (user_id, medical_area_id) VALUES (?, ?);",
        [user_id, medical_area_id],
        function (error, result) {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", result);
            };
        }
    );
};

userCtrl.getUserMedicalArea = async (req, res) => {
    const { user_id } = req.params;
    mysql.query(
        "SELECT uma.user_medical_area_id, uma.medical_area_id, ma.name " +
        "FROM user_medical_area uma JOIN medical_area ma ON uma.medical_area_id = ma.medical_area_id " +
        "WHERE uma.user_id = ? AND is_active = 1;",
        [user_id],
        function (error, result) {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", result);
            };
        }
    );
};

userCtrl.getUserProfessional = async (req, res) => {
    mysql.query(
        "SELECT u.user_id professional_id, concat(u.names, ' ', u.lastnames)  professional_fullname, u.run professional_run, u.email professional_email, uma.medical_area_id professional_medical_area_id, ma.name professional_medical_area_name " +
        "FROM user u JOIN user_medical_area uma ON u.user_id = uma.user_id JOIN medical_area ma ON uma.medical_area_id = ma.medical_area_id " +
        "WHERE u.user_type_id = 2;",
        function (error, result) {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", result);
            };
        }
    );
};

module.exports = userCtrl;