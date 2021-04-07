const { sendResponse } = require("../utils/responseHandler")
const { mysql } = require("../_config/mysql")

const listCtrl = {}

listCtrl.getPersonList = async (req, res) => {
    mysql.query(
        "SELECT person_id, run, names, lastnames, CONCAT(names, ' ', lastnames) fullname FROM person WHERE is_active = 1;",
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

//#region User Data
listCtrl.getMaritalStatusList = async (req, res) => {
    mysql.query(
        "SELECT * FROM marital_status;",
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

listCtrl.getGenderList = async (req, res) => {
    mysql.query(
        "SELECT * FROM gender;",
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

listCtrl.getEducationalLevelList = async (req, res) => {
    mysql.query(
        "SELECT * FROM educational_level;",
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

listCtrl.getNativeOriginList = async (req, res) => {
    mysql.query(
        "SELECT * FROM native_origin;",
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

listCtrl.getPrevisionList = async (req, res) => {
    mysql.query(
        "SELECT * FROM prevision;",
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

listCtrl.getCovidRiskList = async (req, res) => {
    mysql.query(
        "SELECT * FROM covid19_risk;",
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

listCtrl.getInformedConsentAnswerList = async (req, res) => {
    mysql.query(
        "SELECT * FROM informed_consent_answer;",
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

listCtrl.getLivesWithList = async (req, res) => {
    mysql.query(
        "SELECT * FROM lives_with;",
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

listCtrl.getUserTypeList = async (req, res) => {
    mysql.query(
        "SELECT * FROM user_type;",
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

listCtrl.getMedicalAreaList = async (req, res) => {
    mysql.query(
        "SELECT * FROM medical_area WHERE is_active = 1;",
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", result);
            };
        }
    );
};

//#endregion

//#region Medical Consultation

listCtrl.getMedicalConsState = async (req, res) => {
    mysql.query(
        "SELECT * FROM medical_cons_state; ",
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}


listCtrl.getMedicalConsCategory = async (req, res) => {
    mysql.query(
        "SELECT * FROM medical_cons_category; ",
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

listCtrl.getMedicalConsSubCategory = async (req, res) => {
    const { medicalConsCategoryId } = req.params

    mysql.query(
        "SELECT * FROM medical_cons_sub_category WHERE medical_cons_category_id = ?;",
        [medicalConsCategoryId],
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

listCtrl.getMedicalConsDetailCategory = async (req, res) => {
    const { medicalConstSubCategoryId } = req.params

    mysql.query(
        "SELECT * FROM medical_cons_detail_category WHERE medical_cons_sub_category_id = ?;",
        [medicalConstSubCategoryId],
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

listCtrl.getConfirmationOption = async (req, res) => {
    mysql.query(
        "SELECT * FROM confirmation_option; ",
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}
//#endregion

//#region Anamnesis
listCtrl.getDieseases = async (req, res) => {
    mysql.query(
        "SELECT * FROM disease;",
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

listCtrl.getMuscularPainList = async (req, res) => {
    mysql.query(
        "SELECT * FROM muscular_pain;",
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

listCtrl.getConsent = async (req, res) => {
    mysql.query(
        "SELECT * FROM informed_consent_answer;",
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}


listCtrl.getAtmValues = async (req, res) => {
    mysql.query(
        "SELECT * FROM atm_value;",
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

listCtrl.getMucogingivalAlterations = async (req, res) => {
    mysql.query(
        "SELECT * FROM mucogingival_alteration;",
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

listCtrl.getForms = async (req, res) => {
    mysql.query(
        "SELECT * FROM form;",
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

listCtrl.getColors = async (req, res) => {
    mysql.query(
        "SELECT * FROM color;",
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

listCtrl.getSurfaces = async (req, res) => {
    mysql.query(
        "SELECT * FROM surface;",
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

listCtrl.getConsistencies = async (req, res) => {
    mysql.query(
        "SELECT * FROM consistency;",
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

listCtrl.getEvolutionForms = async (req, res) => {
    mysql.query(
        "SELECT * FROM evolution_form;",
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

listCtrl.getSymptomatologies = async (req, res) => {
    mysql.query(
        "SELECT * FROM symptomatology;",
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

listCtrl.getEdges = async (req, res) => {
    mysql.query(
        "SELECT * FROM edge;",
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

listCtrl.getLocalizations = async (req, res) => {
    mysql.query(
        "SELECT * FROM localization;",
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

listCtrl.getTeethStates = async (req, res) => {
    mysql.query(
        "SELECT * FROM teeth_state;",
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

listCtrl.getTeeths = async (req, res) => {
    mysql.query(
        "SELECT * FROM teeth;",
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

listCtrl.getRegionList = async (req, res) => {
    mysql.query(
        "SELECT * FROM region;",
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", result);
            };
        }
    );
};

listCtrl.getRegisteredByList = async (req, res) => {
    mysql.query(
        "SELECT * FROM registered_by;",
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", result);
            };
        }
    );
};

listCtrl.getTownList = async (req, res) => {
    mysql.query(
        "SELECT * FROM town;",
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                sendResponse(res, false, "Success", result);
            };
        }
    );
};

//#endregion

module.exports = listCtrl