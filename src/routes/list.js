const { Router } = require('express')
const router = Router()

const { 
    getPersonList, getMedicalConsCategory, getMedicalConsSubCategory, getMedicalConsDetailCategory,
    getConfirmationOption, getMedicalConsState, getMaritalStatusList, getGenderList, 
    getEducationalLevelList, getNativeOriginList, getPrevisionList, getCovidRiskList, 
    getInformedConsentAnswerList, getLivesWithList, getUserTypeList, getMedicalAreaList, getDieseases, getMuscularPainList, getAtmValues,
    getMucogingivalAlterations, getForms, getColors, getSurfaces, getConsistencies,
    getEvolutionForms, getSymptomatologies, getEdges, getLocalizations, getTeethStates, getConsent,   
    getTeeths, getRegionList, getRegisteredByList, getTownList
} = require("../controllers/list.controller")

//#region User Data
router.route('/person')
    .get(getPersonList)
router.route('/marital-status')
    .get(getMaritalStatusList)
router.route('/gender')
    .get(getGenderList)
router.route('/education-level')
    .get(getEducationalLevelList)
router.route('/native-origin')
    .get(getNativeOriginList)
router.route('/prevision')
    .get(getPrevisionList)
router.route('/covid-risk')
    .get(getCovidRiskList)
router.route('/informed-consent-answers')
    .get(getInformedConsentAnswerList)
router.route('/lives-with')
    .get(getLivesWithList)
router.route('/consent')
    .get(getConsent)
router.route('/region')
    .get(getRegionList);
router.route('/registered-by')
    .get(getRegisteredByList);
router.route('/town')
    .get(getTownList);
//#endregion    

//#User data
router.route('/user-type')
    .get(getUserTypeList)
router.route('/medical-area')
    .get(getMedicalAreaList)

//#region Medical Consultation
router.route('/medical-cons-category/')
    .get(getMedicalConsCategory)
router.route('/medical-cons-subcategory/:medicalConsCategoryId')
    .get(getMedicalConsSubCategory)
router.route('/medical-cons-detail-category/:medicalConstSubCategoryId')
    .get(getMedicalConsDetailCategory)
router.route('/confirmation-option/')
    .get(getConfirmationOption)
router.route('/medical-cons-state')
    .get(getMedicalConsState)
//#endregion

//#region Anamnesis
router.route('/diseases')
    .get(getDieseases)
router.route('/muscular-pain')
    .get(getMuscularPainList)
router.route('/atm-values')
    .get(getAtmValues)
router.route('/mucogingival-alterations')
    .get(getMucogingivalAlterations)
router.route('/forms')
    .get(getForms)
router.route('/colors')
    .get(getColors)
router.route('/surfaces')
    .get(getSurfaces)
router.route('/consistencies')
    .get(getConsistencies)
router.route('/evolution-forms')
    .get(getEvolutionForms)
router.route('/symptomatologies')
    .get(getSymptomatologies)
router.route('/edges')
    .get(getEdges)
router.route('/localizations')
    .get(getLocalizations)
router.route('/teeth-states')
    .get(getTeethStates)
router.route('/teeths')
    .get(getTeeths)
//#endregion

module.exports = router