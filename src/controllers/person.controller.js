const { sendResponse } = require('../utils/responseHandler');
const { mysql } = require('../_config/mysql')
const bcrypt = require('bcrypt')

const personCtrl = {}

personCtrl.createBasic = async (req, res) => {
    const {run, names, lastnames, birthdate, address, is_retired, region_id, town_id, registered_by_id, phone, cellphone, email, carer_names, carer_lastnames, carer_town_id, carer_phone, carer_cellphone, carer_email} = req.body;
    var passLimpia = run.replace('-',"");
    const encrypted = bcrypt.hashSync(passLimpia, 10);
    mysql.query("call sp_person_i(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [run, names, lastnames, birthdate, address, is_retired, region_id, town_id, registered_by_id, phone, cellphone, email, encrypted, carer_names, carer_lastnames, carer_town_id, carer_phone, carer_cellphone, carer_email],
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error);
            } else {
                console.log(results)
                sendResponse(res, false, "Success", results);
            };
        }
    );
};

personCtrl.createAddres = async (req, res) => {
    const { 
        personId, street, number, apartment, city, commune 
    } = req.body

    mysql.query(
        "START TRANSACTION; " +

        "INSERT INTO address (street, number, apartment, city, commune) " + 
        "VALUES (?, ?, ?, ?, ?); " +

        "SET @address_id = LAST_INSERT_ID(); " +

        "UPDATE person SET addres_id = @addres_id WHERE person_id = ?; " +

        "COMMIT;",
        [
            street, number, apartment, city, commune, personId
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

personCtrl.createInformedConsent = async (req, res) => {
    const { 
        personId,informed_consent_answer_id,observations,consentRead
    } = req.body

    mysql.query(
        "UPDATE informed_consent SET informed_consent_answer_id =?, consent_read = ?, observations = ? WHERE informed_consent.person_id = ?;",
        [ informed_consent_answer_id, consentRead, observations, personId],
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", results)
            }
        }
    )
}

personCtrl.createTrigaeCovid = async (req, res) => {
    const { personId, covidRiskId } = req.body

    mysql.query(
        "UPDATE trigae_covid19 SET covid19_risk_id =? WHERE trigae_covid19.person_id = ?;",
        [covidRiskId, personId],
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

personCtrl.updateTrigaeCovid = async (req, res) => {
    const { personId, covidRiskId, temperatura } = req.body

    mysql.query(
        "UPDATE trigae_covid19 SET covid19_risk_id=?,temperature=? WHERE person_id= ?",
        [covidRiskId, temperatura,personId],
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}


personCtrl.updateContactInfo = async (req, res) => {
    const { personId, phone, cellphone, email } = req.body

    mysql.query(
        "UPDATE contact_info SET phone = ?, cellphone = ?, email = ? WHERE person_id= ?",
        [phone, cellphone, email, personId],
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}


personCtrl.updateSociodemographicData = (req, res) => {
    const { 
        personId ,occupation, previsionId, maritalStatusId, birthCommune, nativeOriginId, 
        educationalLevelId, livesWithId
    } = req.body
    
    mysql.query(
        "UPDATE person SET occupation = ?, prevision_id = ?, marital_status_id = ?, birth_commune = ?, "+
        "native_origin_id = ?, educational_level_id = ?, lives_with_id = ? WHERE person_id = ?",
        [
            occupation, previsionId, maritalStatusId, birthCommune, nativeOriginId, 
            educationalLevelId, livesWithId, personId
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

personCtrl.createPreMotivConsultation = (req, res) => {
    const { 
        personId ,urgency, pain, cavities, wounds, bleeding, 
        fracture, trauma, swelling, treatment, other, ohip, barthel
    } = req.body
    
    mysql.query(
        "START TRANSACTION; " +
        "SET @person_id = ?; " +
        "UPDATE pre_medical_consultation SET other = ?, urgency = ?, pain = ?, cavities = ?, wounds = ?, bleeding = ?, fracture = ?, trauma = ?, swelling = ?, treatment = ? WHERE person_id = @person_id;" +
        "UPDATE person SET ohip14sp_result = ?, dependency_level = ? WHERE person_id = @person_id;" +
        "COMMIT;",
        [
            personId, other, urgency, pain, cavities, wounds, bleeding, fracture, trauma, swelling, treatment, ohip, barthel
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


personCtrl.getPreMotivConsultation = async (req, res) => {
    const { personId } = req.params
    mysql.query(
        "SELECT * FROM pre_medical_consultation WHERE person_id = ?",
        [personId],
        function (error, result) {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    );

}


personCtrl.getCarerById = async (req, res) => {
    const { personId } = req.params
    mysql.query(
        "SELECT * FROM carer WHERE person_id = ?",
        [personId],
        function (error, result) {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    );

}

personCtrl.getById = async (req, res) => {
    const { personId } = req.params
    mysql.query(
        "SELECT * FROM person WHERE person_id = ?",
        [personId],
        function (error, result) {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    );

};

personCtrl.getByRun = async (req, res) => {
    const { idrun } = req.params
    mysql.query(
        "SELECT * FROM person WHERE run = ?",
        [idrun],
        function (error, result) {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    );

};

personCtrl.listPatient = async (req, res) => {
    await mysql.query(
        "SELECT " +
            "p.person_id, p.run, p.names, p.lastnames, DATE_FORMAT(p.birthdate, '%Y-%m-%d') birthdate, p.is_retired, p.address, p.is_retired, p.town_id, p.registered_by_id, p.region_id, " +
            "ci.contact_id, ci.phone, ci.cellphone, ci.email, " +
            "c.carer_id, c.names carer_names, c.lastnames carer_lastnames, c.phone carer_phone, c.cellphone carer_cellphone, c.email carer_email, c.town_id carer_town_id, " +
            "pmc.id_pre_medical_consultation, pmc.urgency, pmc.pain, pmc.cavities, pmc.wounds, pmc.bleeding, pmc.fracture, pmc.trauma, pmc.swelling, pmc.treatment, pmc.other, p.dependency_level, p.ohip14sp_result, " +
            "tc.trigae_covid19_id, tc.covid19_risk_id, tc.temperature, " +
            "ic.informed_consent_id, ic.informed_consent_answer_id, ic.consent_read, ic.observations, " +
            "p.occupation, p.prevision_id, p.marital_status_id, p.birth_commune, p.native_origin_id, p.educational_level_id, p.lives_with_id " +
        "FROM " +
            "person p " +
            "JOIN contact_info ci ON p.person_id = ci.person_id " +
            "JOIN carer c ON p.person_id = c.person_id " +
            "JOIN pre_medical_consultation pmc ON p.person_id = pmc.person_id " +
            "JOIN trigae_covid19 tc ON p.person_id = tc.person_id " +  
            "JOIN informed_consent ic ON p.person_id = ic.person_id " + 
        "WHERE p.is_active = 1;",
        function (error, result) {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {

                sendResponse(res, false, "Success", result)
            }
        }
    );

};



// personCtrl.deleteByRun = async (req,res) => {
//     const { idrun } = req.params
//     console.log("El run a eliminar es "+ idrun )
//     mysql.query(
//         "DELETE FROM run WHERE run_id = ?; FLUSH TABLES;",
//         [idrun],
//         (error, result) => {
//             if (error) {
//                 sendResponse(res, true, "TaskFailed", error)
//             } else {
//                 sendResponse(res, false, "Success", result)
//             }
//         }
//     )
// }

// personCtrl.deleteThis = async (req, res) => {
//     const { personId } = req.params
//     console.log(req.params)
//     mysql.query(
//         "DELETE FROM person WHERE person_id = ?;",
//         [personId],
//         (error, result) => {
//             if (error) {
//                 sendResponse(res, true, "TaskFailed", error)
//             } else {
//                 sendResponse(res, false, "Success", result)
//             }
//         }
//     )
// }

personCtrl.getAll = async (req, res) => {
    mysql.query(
        "SELECT * FROM person;",
        (error, result) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                sendResponse(res, false, "Success", result)
            }
        }
    )
}

personCtrl.updatePerson = async (req, res) => {
    const {
        person_id, run, names, lastnames, birthdate, occupation, prevision_id, marital_status_id, birth_commune, native_origin_id, educational_level_id, is_retired, lives_with_id, address, town_id, registered_by_id, region_id,
        phone, cellphone, email,
        carer_names, carer_lastnames, carer_phone, carer_cellphone, carer_email, carer_town_id,
        urgency, pain, cavities, wounds, bleeding, fracture, trauma, swelling, treatment, other,
        covid19_risk_id, temperature,
        informed_consent_answer_id, consent_read, observations, ohip14sp_result, dependency_level
    } = req.body;
    mysql.query("call sp_person_u(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [person_id, run, names, lastnames, birthdate, occupation, prevision_id, marital_status_id, birth_commune, native_origin_id, educational_level_id, lives_with_id, is_retired, address, town_id, registered_by_id, region_id,
        phone, cellphone, email,
        carer_names, carer_lastnames, carer_phone, carer_cellphone, carer_email, carer_town_id,
        urgency, pain, cavities, wounds, bleeding, fracture, trauma, swelling, treatment, other,
        covid19_risk_id, temperature,
        informed_consent_answer_id, consent_read, observations, ohip14sp_result, dependency_level],
        (error, results) => {
            if (error) {
                sendResponse(res, true, "TaskFailed", error)
            } else {
                console.log(results)
                sendResponse(res, false, "Success", results)
            };
        }
    );
};

// personCtrl.updatePatient = async (req, res) => {
//     const { personId } = req.params
//     const { name, lastname, run, runToBeChanged, other,urgency,pain,cavities,wounds,bleeding,fracture, answer, covid_risk, phoneNumber, cellNumber, email,
//         occupation, prevision_id, marital_status_id, native_origin_id, educational_level_id} = req.body
//     console.log(req.body)
//     //console.log("Datos: "+personId+"-"+name+"-"+lastname+"-"+run)
//     mysql.query(
//         "UPDATE person, run SET names = ?, lastnames = ?, run = ?, occupation = ?, prevision_id = ?, marital_status_id = ?, native_origin_id =?, educational_level_id = ? WHERE person_id = ? and idrun = ?;"+
//         "UPDATE credentials SET run = ?, password=? WHERE person_id = ?;"+
//         "UPDATE pre_medical_consultation SET other =?, urgency = ?, pain = ?, cavities = ?, wounds = ?, bleeding = ?, fracture = ? WHERE pre_medical_consultation.person_id = ?;"+
//         "UPDATE informed_consent SET informed_consent_answer_id =? WHERE informed_consent.person_id = ?;"+
//         "UPDATE trigae_covid19 SET covid19_risk_id =? WHERE trigae_covid19.person_id = ?;"+
//         "UPDATE contact_info SET phone = ?, cellphone = ?, email = ? WHERE contact_info.person_id = ?;",
//         [name, lastname, run, occupation, prevision_id, marital_status_id, native_origin_id, educational_level_id, personId, runToBeChanged,
//         run, run, personId,
//         other, urgency, pain, cavities, wounds, bleeding, fracture, personId, 
//         answer, personId,
//         covid_risk, personId,
//         phoneNumber, cellNumber, email, personId
//     ],
//         (error, result) => {
//             if (error) {
//                 sendResponse(res, true, "TaskFailed", error)
//             } else {
//                 sendResponse(res, false, "Success", result)
//             }
//         }
//     )
// };

personCtrl.statePerson = async (req, res) => {
    const { run } = req.params;
    mysql.query(
        "START TRANSACTION; " +
        "UPDATE person SET is_active = !is_active WHERE run = ?;" +
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


//MOBILE##############################################################################################################################
personCtrl.getPersonByRun = async (req, res) => {
    const {run} = req.params;
    mysql.query(
        "SELECT p.run, p.names, p.lastnames, p.birthdate, ci.phone, ci.cellphone, c.names carer_names, c.lastnames carer_lastnames, c.phone carer_phone, c.cellphone carer_cellphone " +
        "FROM person p JOIN contact_info ci ON p.person_id = ci.person_id JOIN carer c ON p.person_id = c.person_id " +
        "WHERE p.run = ? AND p.is_active = 1;",
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

module.exports = personCtrl