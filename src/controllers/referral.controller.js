const { sendResponse } = require("../utils/responseHandler");
const { mysql } = require("../_config/mysql");
const { sendEmail } = require('../_config/mailer');

const referralCtrl = {}

referralCtrl.setActive = async (req, res) => {
    const {referral_id} = req.params;
    mysql.query(
        "START TRANSACTION; " +
        "UPDATE referral SET is_active = !is_active WHERE referral_id = ?;" +
        "COMMIT;",
        [referral_id],
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", result);
            };
        }
    );
};

referralCtrl.getByPersonId = async (req, res) => {
    const { person_id } = req.params
    mysql.query(
        "SELECT r.referral_id, r.person_id, r.user_id professional_id, r.medical_area_id professional_medical_area_id, r.referral_description, r.created_date referral_created_date, u.run professional_run, u.email professional_email, concat(u.names, ' ', u.lastnames) professional_fullname, ma.name professional_medical_area_name " +
        "FROM referral r JOIN user u ON r.user_id = u.user_id JOIN medical_area ma ON r.medical_area_id = ma.medical_area_id " +
        "WHERE r.person_id = ? AND r.is_active = 1;",
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

referralCtrl.createBasic = async (req, res) => {
    const {person_id, professional_id, professional_medical_area_id, referral_description, professional_email, emailBody} = req.body;
    mysql.query(
        "START TRANSACTION; " +
        "INSERT INTO referral (person_id, user_id, medical_area_id, referral_description) " +
        "VALUES (?, ?, ?, ?);" +
        "COMMIT;",
        [person_id, professional_id, professional_medical_area_id, referral_description],
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendEmail(professional_email, "Interconsulta", emailBody);
                sendResponse(res, false, "Success", results);
            };
        }
    );
};

referralCtrl.updateBasic = async (req, res) => {
    const {referral_id} = req.params
    const {professional_id, professional_medical_area_id, referral_description} = req.body;
    mysql.query(
        "START TRANSACTION; " +
        "UPDATE referral " +
        "SET user_id = ?, medical_area_id = ?, referral_description = ? " +
        "WHERE referral_id = ?; " +
        "COMMIT;",
        [professional_id, professional_medical_area_id, referral_description, referral_id],
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", results);
            };
        }
    );
};

module.exports = referralCtrl;