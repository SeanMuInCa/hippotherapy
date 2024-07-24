const queryFunctions = require('../db_functions/querryExecutors');
const { Parser } = require('json2csv');

const parser = new Parser();

/**
 * Handles registering a new therapist.
 * 
 * @async
 * @function registerTherapistQuery
 * @param {Object} req - Express request object containing the therapist details in the body.
 * @param {Object} req.body - The body of the request.
 * @param {Object} res - Express response object to send the response.
 * @returns {Promise<void>} Sends a JSON response with the appropriate status code.
 * 
 * @throws Will return a 500 status code if an unexpected error occurs.
 */
const registerTherapistQuery = async (req, res) => {
    try {
        const userDetails = req.body;

        // Input validation: Check if therapist details are provided
        if (userDetails.constructor === Object && Object.keys(userDetails).length === 0) {
            return res.status(400).json({ error: 'Therapist details are required.' });
        }

        // Call the function to register the therapist
        const result = await queryFunctions.registerTherapist(userDetails);

        
        if(result.success) {
            // Return the result with a 201 status code
            res.status(201).json(result);
        } else {
            res.status(400).json(result);
        }
        
    } catch (err) {
        // Log the error for debugging purposes
        console.error('Error during therapist registration:', err);

        // Send a 500 status code for server errors
        res.status(500).json({ error: 'An error occurred during registration.' });
    }
};

/**
 * Handles the login process for a user.
 * 
 * @async
 * @function loginQuery
 * @param {Object} req - Express request object containing the login details.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.email - The email of the user attempting to log in.
 * @param {string} req.body.password - The password of the user attempting to log in.
 * @param {Object} res - Express response object to send the response.
 * @returns {Promise<void>} Sends a JSON response with the appropriate status code.
 * 
 * @throws Will return a 500 status code if an unexpected error occurs.
 */
const loginQuery = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation: Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        // Call the function to log in the user
        const result = await queryFunctions.login_user(email, password);

        // Check the result and respond accordingly
        if (result.success) {
            // If login is successful, send a 200 OK status with the result
            res.status(200).json(result);
        } else {
            // If login fails (invalid credentials), send a 401 Unauthorized status
            res.status(401).json({ error: 'Invalid email or password.' });
        }
    } catch (err) {
        // Log the error for debugging purposes
        console.error('Error during login:', err);

        // Send a 500 Internal Server Error status for any server error
        res.status(500).json({ error: 'An error occurred during login.' });
    }
};

/**
 * Handles the creation of a new patient profile.
 * 
 * @async
 * @function newPatientQuery
 * @param {Object} req - Express request object containing the patient details.
 * @param {Object} req.body - The body of the request.
 * @param {Object} res - Express response object to send the response.
 * @returns {Promise<void>} Sends a JSON response with the appropriate status code.
 * 
 * @throws Will return a 500 status code if an unexpected error occurs.
 */
const newPatientQuery = async (req, res) => {
    try {
        const patientDetails = req.body;

        // Validate patientDetails: Check if patient details are provided
        if (patientDetails.constructor === Object && Object.keys(patientDetails).length === 0) {
            return res.status(400).json({ error: 'Patient details are required.' });
        }

        // Call the function to insert new patient profile
        const result = await queryFunctions.new_patient_profile(patientDetails);

        if(result.success) {
            // Return the result with a 201 status code
            res.status(201).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (err) {
        // Log the error for debugging purposes
        console.error('Error creating new patient profile:', err);

        // Send a 500 Internal Server Error status for any server errors
        res.status(500).json({ error: 'An error occurred while creating the new patient profile.' });
    }
};

/**
 * Handles the creation of a new session.
 * 
 * @async
 * @function startNewSessionQuery
 * @param {Object} req - Express request object containing the session details.
 * @param {Object} req.body - The body of the request.
 * @param {Object} res - Express response object to send the response.
 * @returns {Promise<void>} Sends a JSON response with the appropriate status code.
 * 
 * @throws Will return a 500 status code if an unexpected error occurs.
 */
const startNewSessionQuery = async(req, res) => {
    try {
        const sessionDetails = req.body;

        // Validate sessionDetails: Check if session details are provided
        if(sessionDetails.constructor === Object && Object.keys(sessionDetails).length === 0) {
            return res.status(400).json({ error: 'Session details are required.' });
        }

        // Call the function to start a new session
        const result = await queryFunctions.startNewSession(sessionDetails);

        // Check if the session creation was successful
        if (result.success) {
            // If session creation is successful, send a 201 Created status with the result
            res.status(201).json(result);
        } else {
            // If session creation fails, send a 400 Bad Request status with the result
            res.status(400).json(result);
        }
    } catch (err) {
        // Log the error for debugging purposes
        console.error('Error starting new session:', err);

        // Send a 500 Internal Server Error status for any server errors
        res.status(500).json({ error: 'An error occurred while starting the new session.' });
    }
};

/**
 * Handles the creation of a new assessment.
 * 
 * @async
 * @function addNewAssessmentQuery
 * @param {Object} req - Express request object containing the assessment details.
 * @param {Object} req.body - The body of the request.
 * @param {Object} res - Express response object to send the response.
 * @returns {Promise<void>} Sends a JSON response with the appropriate status code.
 * 
 * @throws Will return a 500 status code if an unexpected error occurs.
 */
const addNewAssessmentQuery = async (req, res) => {
    try {
        const assessmentDetails = req.body;

        // Validate assessmentDetails: Check if assessment details are provided
        if (assessmentDetails.constructor === Object && Object.keys(assessmentDetails).length === 0) {
            return res.status(400).json({ error: 'Assessment details are required.' });
        }

        // Call the function to add a new assessment
        const result = await queryFunctions.addNewAssessment(assessmentDetails);

        // Check if the assessment creation was successful
        if (result.success) {
            // If assessment creation is successful, send a 201 Created status with the result
            res.status(201).json(result);
        } else {
            // If assessment creation fails, send a 400 Bad Request status with the result
            res.status(400).json(result);
        }
    } catch (err) {
        // Log the error for debugging purposes
        console.error('Error adding new assessment:', err);

        // Send a 500 Internal Server Error status for any server errors
        res.status(500).json({ error: 'An error occurred while adding the new assessment.' });
    }
};

/**
 * Handles retrieving an assessment by session ID.
 * 
 * @async
 * @function getAssessmentBySessionIdQuery
 * @param {Object} req - Express request object containing the session ID parameter.
 * @param {Object} req.params - The URL parameters of the request.
 * @param {string} req.params.sessionId - The session ID for which to retrieve the assessment.
 * @param {Object} res - Express response object to send the response.
 * @returns {Promise<void>} Sends a JSON response with the appropriate status code.
 * 
 * @throws Will return a 500 status code if an unexpected error occurs.
 */
const getAssessmentBySessionIdQuery = async (req, res) => {
    try {
        const { sessionId } = req.params;

        // Validate sessionId: Check if session ID is provided
        if (!sessionId) {
            return res.status(400).json({ error: 'Session ID is required.' });
        }

        // Call the function to retrieve the assessment
        const result = await queryFunctions.getAssessmentBySessionId(sessionId);

        // Check if the retrieval was successful
        if (result.success) {
            // If retrieval is successful, send a 200 OK status with the result
            res.status(200).json(result);
        } else {
            // If no assessment is found, send a 404 Not Found status with the result
            res.status(404).json(result);
        }
    } catch (err) {
        // Log the error for debugging purposes
        console.error('Error retrieving assessment:', err);

        // Send a 500 Internal Server Error status for any server errors
        res.status(500).json({ error: 'An error occurred while retrieving the assessment.' });
    }
};

/**
 * Handles retrieving patient information and sessions by therapist and patient IDs.
 * 
 * @async
 * @function getPatientInfoAndSessionsQuery
 * @param {Object} req - Express request object containing the therapist and patient ID parameters.
 * @param {Object} req.params - The URL parameters of the request.
 * @param {string} req.params.therapistId - The therapist ID for which to retrieve the data.
 * @param {string} req.params.patientId - The patient ID for which to retrieve the data.
 * @param {Object} res - Express response object to send the response.
 * @returns {Promise<void>} Sends a JSON response with the appropriate status code.
 * 
 * @throws Will return a 500 status code if an unexpected error occurs.
 */
const getPatientInfoAndSessionsQuery = async (req, res) => {
    try {
        const {therapistId, patientId} = req.params;

        // Validate therapistId and patientId: Check if both IDs are provided
        if (!patientId && !therapistId) {
            return res.status(400).json({ error: 'Patient ID and Therapist ID are required.' });
        }

        // Call the function to retrieve patient info and sessions
        const result = await queryFunctions.getPatientInfoAndSessions(patientId, therapistId);

        // Check if the retrieval was successful
        if (result.success) {
            // If retrieval is successful, send a 200 OK status with the result
            res.status(200).json(result);
        } else {
            // If no data is found, send a 404 Not Found status with the result
            res.status(404).json(result);
        }
    } catch (err) {
        // Log the error for debugging purposes
        console.error('Error retrieving patient info and sessions:', err);

        // Send a 500 Internal Server Error status for any server errors
        res.status(500).json({ error: 'An error occurred while retrieving the patient info and sessions.' });
    }
};

/**
 * Handles retrieving the patient list for a given therapist.
 * 
 * @async
 * @function getPatientList
 * @param {Object} req - Express request object containing the therapist ID parameter.
 * @param {Object} req.params - The URL parameters of the request.
 * @param {string} req.params.therapistId - The therapist ID for which to retrieve the patient list.
 * @param {Object} res - Express response object to send the response.
 * @returns {Promise<void>} Sends a JSON response with the appropriate status code.
 * 
 * @throws Will return a 500 status code if an unexpected error occurs.
 */
const getPatientList = async (req, res) => {
    try {
        const {therapistId} = req.params;

        // Validate therapistId: Check if therapist ID is provided
        if (!therapistId) {
            return res.status(400).json({ error: 'Therapist ID is required.' });
        }

        // Call the function to retrieve patient list
        const result = await queryFunctions.getPatientList(therapistId);

        // Check if the retrieval was successful
        if (result.success) {
            // If retrieval is successful, send a 200 OK status with the result
            res.status(200).json(result);
        } else {
            // If no patient list is found, send a 404 Not Found status with the result
            res.status(404).json(result);
        }
    } catch (err) {
        // Log the error for debugging purposes
        console.error('Error retrieving patient list:', err);

        // Send a 500 Internal Server Error status for any server errors
        res.status(500).json({ error: 'An error occurred while retrieving the patient list.' });
    }
}

/**
 * Handles updating the therapist profile.
 * 
 * @async
 * @function updateTherapistProfile
 * @param {Object} req - Express request object containing the therapist details in the body.
 * @param {Object} req.body - The body of the request.
 * @param {Object} res - Express response object to send the response.
 * @returns {Promise<void>} Sends a JSON response with the appropriate status code.
 * 
 * @throws Will return a 500 status code if an unexpected error occurs.
 */
const updateTherapistProfile = async (req, res) => {
    try {
        const therapistDetails = req.body;

        // Validate therapistDetails: Check if therapist details are provided
        if(therapistDetails.constructor === Object && Object.keys(therapistDetails).length === 0) {
            return res.status(400).json({ error: 'Therapist details are required.' });
        }

        // Call the function to update the therapist profile
        const result = await queryFunctions.updateTherapistProfile(therapistDetails);

        // Check if the update was successful
        if(result.success){
            // If update is successful, send a 200 OK status with the result
            res.status(200).json(result);
        } else {
            // If update fails, send a 404 Not Found status with the result
            res.status(404).json(result);
        } 
    } catch (err) {
        // Log the error for debugging purposes
        console.error('Error updating therapist profile:', err);

        // Send a 500 Internal Server Error status for any server errors
        res.status(500).json({ error: 'An error occurred while updating the therapist profile.' });
    }
}

/**
 * Handles retrieving therapist details by therapist ID.
 * 
 * @async
 * @function fetchTherapistDetails
 * @param {Object} req - Express request object containing the therapist ID parameter.
 * @param {Object} req.params - The URL parameters of the request.
 * @param {string} req.params.therapistId - The therapist ID for which to retrieve the details.
 * @param {Object} res - Express response object to send the response.
 * @returns {Promise<void>} Sends a JSON response with the appropriate status code.
 * 
 * @throws Will return a 500 status code if an unexpected error occurs.
 */
const fetchTherapistDetails = async (req, res) => {
    try {
        const therapistId = req.params.therapistId; 

        // Validate therapistId: Check if therapist ID is provided
        if (!therapistId) {
            return res.status(400).json({ error: 'Therapist ID is required.' });
        }

        // Call the function to retrieve therapist details
        const result = await queryFunctions.getTherapistDetails(therapistId);

        // Check if the retrieval was successful
        if (result.success) {
            // If retrieval is successful, send a 200 OK status with the result
            res.status(200).json(result);
        } else {
            /// If no data is found, send a 404 Not Found status with the result
            res.status(404).json(result);
        }
    } catch (err) {
        // Log the error for debugging purposes
        console.error('Error retrieving therapist details:', err);

        // Send a 500 Internal Server Error status for any server errors
        res.status(500).json({ error: 'An error occurred while retrieving therapist details.' });
    }
}

/**
 * Handles updating the patient profile.
 * 
 * @async
 * @function updatePatientProfile
 * @param {Object} req - Express request object containing the patient details in the body.
 * @param {Object} req.body - The body of the request.
 * @param {Object} res - Express response object to send the response.
 * @returns {Promise<void>} Sends a JSON response with the appropriate status code.
 * 
 * @throws Will return a 500 status code if an unexpected error occurs.
 */
const updatePatientProfile = async (req, res) => {
    try{
        const body = req.body;

        // Validate body: Check if patient details are provided
        if(body.constructor === Object && Object.keys(body).length === 0) {
            return res.status(400).json({ error: 'Patient details are required.' });
        }

        // Call the function to update the patient profile
        const result = await queryFunctions.updatePatientProfile(body);

        // Check if the update was successful
        if(result.success){
            // If update is successful, send a 200 OK status with the result
            res.status(200).json(result);
        } else {
            // If update fails, send a 404 Not Found status with the result
            res.status(404).json(result);
        } 
    } catch (err) {
        // Log the error for debugging purposes
        console.error('Error updating Patient profile:', err);

        // Send a 500 Internal Server Error status for any server errors
        res.status(500).json({ error: 'An error occurred while updating the Patient profile.' });
    }
}

/**
 * Handles ending a session by session ID.
 * 
 * @async
 * @function endSession
 * @param {Object} req - Express request object containing the session ID in the body.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.session_id - The session ID for which to end the session.
 * @param {Object} res - Express response object to send the response.
 * @returns {Promise<void>} Sends a JSON response with the appropriate status code.
 * 
 * @throws Will return a 500 status code if an unexpected error occurs.
 */

const endSession = async (req, res) => {
    try{
        const session_id = req.body.session_id;

        // Validate session_id: Check if session ID is provided
        if(!session_id){
            return res.status(400).json({ error: 'Session ID is required.' });
        }

        // Call the function to end the session
        const result = await queryFunctions.endSession(session_id);

        // Check if the session ending was successful
        if(result.success) {
            // If ending the session is successful, send a 200 OK status with the result
            res.status(200).json(result);
        } else {
            // If ending the session fails, send a 404 Not Found status with the result
            res.status(404).json(result);
        }
    } catch (err) {
        // Log the error for debugging purposes
        console.error('Error Ending Session:', err);

        // Send a 500 Internal Server Error status for any server errors
        res.status(500).json({ error: 'An error occurred while Ending the Session.'});
    }
};

/**
 * Handles the login process for a researcher.
 * 
 * @async
 * @function loginResearcherQuery
 * @param {Object} req - Express request object containing the login details.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.email - The email of the researcher attempting to log in.
 * @param {string} req.body.password - The password of the researcher attempting to log in.
 * @param {Object} res - Express response object to send the response.
 * @returns {Promise<void>} Sends a JSON response with the appropriate status code.
 * 
 * @throws Will return a 500 status code if an unexpected error occurs.
 */
const loginResearcherQuery = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation: Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        // Call the function to log in the researcher
        const result = await queryFunctions.login_research(email, password);

        // Check the result of the login attempt
        if (result.success) {
            // If login is successful, send a 200 OK status with the result
            res.status(200).json(result);
        } else {
            // If login fails (invalid credentials), send a 401 Unauthorized status
            res.status(401).json({ error: 'Invalid email or password.' });
        }
    } catch (err) {
        // Log the error for debugging purposes
        console.error('Error during login:', err);

        // Send a 500 Internal Server Error status for any server errors
        res.status(500).json({ error: 'An error occurred during login.' });
    }
};

/**
 * Handles verifying a user's answer.
 * 
 * @async
 * @function verifyUserAnswer
 * @param {Object} req - Express request object containing the email and answer in the body.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.email - The email of the user attempting verification.
 * @param {string} req.body.answer - The answer provided by the user for verification.
 * @param {Object} res - Express response object to send the response.
 * @returns {Promise<void>} Sends a JSON response with the appropriate status code.
 * 
 * @throws Will return a 500 status code if an unexpected error occurs.
 */
const verifyUserAnswer = async (req, res) => {
    try {
        const data = req.body;

        // Input validation: Check if email and answer are provided
        if(data.constructor === Object && Object.keys(data).length === 0) {
            return res.status(400).json({ error: 'Email and answer are required.' });
        }

        // Call the function to verify the user
        const result = await queryFunctions.verifyUser(data);

        // Check the result of the verification attempt
        if (result.success) {
            // If verification is successful, send a 200 OK status with the result
            res.status(200).json(result);
        } else {
            // If verification fails (invalid email or answer), send a 401 Unauthorized status
            res.status(401).json({ error: 'Invalid email or password.' });
        }
    } catch (err) {
        // Log the error for debugging purposes
        console.error('Error during login:', err);

        // Send a 500 Internal Server Error status for any server errors
        res.status(500).json({ error: 'An error occurred during login.' });
    }
};

/**
 * Handles retrieving research data, converting it to CSV format, and sending it as a downloadable file.
 * 
 * @async
 * @function getResearchData
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object to send the response.
 * @returns {Promise<void>} Sends a CSV file with the research data.
 * 
 * @throws Will return a 500 status code if an unexpected error occurs.
 */
const getResearchData = async (req, res) => {
    try {
        // Call the function to get research data
        const result = await queryFunctions.getResearchData();

        // Extract individual data sections
        const therapist = result.therapist;
        const patient = result.patient;
        const session = result.session;
        const assessment = result.assessment;

        // Combine data into a single object
        const data = {
            therapist,
            patient,
            session,
            assessment
        };

        // Convert each section to CSV and combine
        const sections = Object.keys(data).map(key => {
            const csv = parser.parse(data[key]);
            return `\n${key.toUpperCase()}\n${csv}`;
        });

        // Join all sections into a single CSV string
        const combinedCsv = sections.join('\n');

        // Set the response headers to indicate a CSV file download
        res.header('Content-Type', 'text/csv');
        res.attachment('data.csv');

        // Send the combined CSV as the response
        return res.send(combinedCsv)
    } catch (err) {
        // Log the error for debugging purposes
        console.error('Error during Fetching Research data :', err);

        // Send a 500 Internal Server Error status for any server errors
        res.status(500).json({ error: 'An error occurred during Fectching Research data.' });
    }
}

module.exports = {
    registerTherapistQuery,
    loginQuery,
    newPatientQuery,
    startNewSessionQuery,
    addNewAssessmentQuery,
    getAssessmentBySessionIdQuery,
    getPatientInfoAndSessionsQuery,
    getPatientList,
    updateTherapistProfile,
    fetchTherapistDetails,
    updatePatientProfile,
    endSession,
    loginResearcherQuery,
    verifyUserAnswer,
    getResearchData
};