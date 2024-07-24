const express = require('express');
const router = express();
const serverControllor = require('../controller/controller');

// Define routes and map them to controller methods

// Route to register a therapist
router.post('/register', serverControllor.registerTherapistQuery);

// Route to login a user
router.post('/login', serverControllor.loginQuery);

// Route to add a new patient   
router.post('/newPatient', serverControllor.newPatientQuery);

// Route to start a new session
router.post('/newSession', serverControllor.startNewSessionQuery);

// Route to add a new assessment
router.post('/addNewAssessment', serverControllor.addNewAssessmentQuery);

// Route to get assessment details by session ID
router.get('/patientProfile/patient/:sessionId', serverControllor.getAssessmentBySessionIdQuery);

// Route to get patient information and sessions by patient and therapist ID
router.get('/patient-info/:patientId/:therapistId', serverControllor.getPatientInfoAndSessionsQuery);

// Route to get the list of patients for a therapist
router.get('/patientList/:therapistId', serverControllor.getPatientList);

// Route to update a therapist profile
router.put('/updatetherapist', serverControllor.updateTherapistProfile);

// Route to fetch therapist details by therapist ID
router.get('/therapistDetails/:therapistId', serverControllor.fetchTherapistDetails);

// Route to update a patient profile
router.put('/updatePatientProfile', serverControllor.updatePatientProfile);

// Route to end a session
router.put('/endSession', serverControllor.endSession)

// Route to login a researcher
router.post('/researchLogin', serverControllor.loginResearcherQuery);

// Route to verify user answer for password recovery
router.post('/forgotPassword', serverControllor.verifyUserAnswer);

// Route to get research data
router.get('/getResearchData', serverControllor.getResearchData);

module.exports = router;