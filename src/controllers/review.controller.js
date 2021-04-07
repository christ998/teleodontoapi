const { sendResponse } = require('../utils/responseHandler');
const { mysql } = require('../_config/mysql');

const reviewCtrl = {}

reviewCtrl.getTypes = async (req, res) => {
    mysql.query(
        "SELECT review_type_id as 'id', name FROM review_type WHERE is_active;",
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

reviewCtrl.getReviews = async (req, res) => {
    const { personId } = req.params
    mysql.query(
        "SELECT review_id, u.names, review_type_id, description, DATE_FORMAT(created_date, '%d/%m') as 'c_date', " +
            "YEAR(created_date) as 'c_year', DATE_FORMAT(created_date,'%H:%i') as 'c_time', has_file " +
            "FROM review r INNER JOIN user u ON u.user_id = r.user_id " +
            "WHERE person_id = ?;",
            [personId],
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

reviewCtrl.createReview = async (req, res) => {
    const {personId, userId, reviewTypeId, description} = req.body
    mysql.query(
        "START TRANSACTION;" +
        "INSERT INTO review(person_id, user_id, review_type_id, description, created_date, has_file) " +
        "VALUES(?, ?, ?, ?, NOW(), 0);" +
        "COMMIT;",
        [personId, userId, reviewTypeId, description],
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

reviewCtrl.createReviewFile = async (req, res) => {
    const {personId, userId, reviewTypeId, description, url, fileName} = req.body
    mysql.query(
        "START TRANSACTION;" +
        "INSERT INTO review(person_id, user_id, review_type_id, description, created_date, has_file) " +
        "VALUES(?, ?, ?, ?, NOW(), 1);" +
        "SET @review_id = LAST_INSERT_ID();" +
        "INSERT INTO file(review_id, url, name) VALUES(@review_id, ?, ?);" +
        "COMMIT;",
        [personId, userId, reviewTypeId, description, "reviews/" + url, fileName],
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
};

reviewCtrl.getFiles = async (req, res) => {
    mysql.query(
        "SELECT * FROM file;",
        function (error, result) {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", result);
            };
        }
    );
}

//MOBILE##############################################################################################################################
reviewCtrl.getPrescriptionByRun = async (req, res) => {
    const {run} = req.params;
    mysql.query(
        "SELECT r.review_id prescription_id, r.description, r.created_date " +
        "FROM review r JOIN review_type rt ON r.review_type_id = rt.review_type_id JOIN person p ON r.person_id = p.person_id " +
        "WHERE p.run = ? AND p.is_active = 1 AND r.is_active = 1;",
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

reviewCtrl.getUrlFileByReviewId = async (req, res) => {
    const {prescription_id} = req.params;
    mysql.query(
        "SELECT file_id, url, name, created_date FROM file WHERE review_id = ?;",
        [prescription_id],
        function (error, result) {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", result);
            };
        }
    );
};

module.exports = reviewCtrl;