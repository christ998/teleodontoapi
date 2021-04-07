const { sendResponse } = require("../utils/responseHandler")
const { mysql } = require("../_config/mysql")

const consultationAppointmentCtrl = {}

consultationAppointmentCtrl.setState = async (req, res) => {
    const { cons_appo_id } = req.params;
    mysql.query(
        "START TRANSACTION; " +
        "UPDATE consultation_appointment SET is_active = !is_active WHERE cons_appo_id = ?;" +
        "COMMIT;",
        [cons_appo_id],
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", result);
            };
        }
    );
};

consultationAppointmentCtrl.getByPersonId = async (req, res) => {
    const { person_id } = req.params
    mysql.query(
        "SELECT ca.cons_appo_id, p.person_id, p.run, ca.cons_appo_date, ca.cons_appo_time, professional_id, CONCAT(u.names, ' ', u.lastnames) professional_fullname, ca.cons_appo_place, ca.cons_appo_description, ca.is_active " +
        "FROM consultation_appointment ca JOIN person p ON ca.person_id = p.person_id JOIN user u ON ca.professional_id = u.user_id " +
        "WHERE ca.person_id = ? AND ca.is_active = 1;",
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

consultationAppointmentCtrl.updateBasic = async (req, res) => {
    const {cons_appo_id} = req.params
    const {cons_appo_date, cons_appo_time, professional_id, cons_appo_place, cons_appo_description} = req.body;
    mysql.query(
        "START TRANSACTION; " +
        "UPDATE consultation_appointment " +
        "SET cons_appo_date = ?, cons_appo_time = ?, professional_id = ?, cons_appo_place = ?, cons_appo_description = ? " +
        "WHERE cons_appo_id = ?; " +
        "COMMIT;",
        [cons_appo_date, cons_appo_time, professional_id, cons_appo_place, cons_appo_description, cons_appo_id],
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", results);
            };
        }
    );
};

consultationAppointmentCtrl.createBasic = async (req, res) => {
    const {person_id, cons_appo_date, cons_appo_time, professional_id, cons_appo_place, cons_appo_description} = req.body;
    mysql.query(
        "START TRANSACTION; " +
        "INSERT INTO consultation_appointment (person_id, cons_appo_date, cons_appo_time, professional_id, cons_appo_place, cons_appo_description) " + 
        "VALUES (?, ?, ?, ?, ?, ?);" +
        "COMMIT;",
        [person_id, cons_appo_date, cons_appo_time, professional_id, cons_appo_place, cons_appo_description],
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", results);
            };
        }
    );
};

//MOBILE##############################################################################################################################
consultationAppointmentCtrl.getByRun = async (req, res) => {
    const {run} = req.params;
    mysql.query(
        "SELECT ca.cons_appo_id appoinment_id, ca.cons_appo_date appoinment_date, ca.cons_appo_time appoinment_time, cons_appo_place appoinment_place, cons_appo_description appoinment_description, CONCAT(u.names, ' ', u.lastnames) appoinment_professional " +
        "FROM consultation_appointment ca JOIN person p ON ca.person_id = p.person_id JOIN user u ON ca.professional_id = u.user_id " +
        "WHERE p.run = ? AND p.is_active = 1 AND ca.is_active = 1;",
        [run],
        function (error, result) {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", result);
            };
        }
    );
};

module.exports = consultationAppointmentCtrl;