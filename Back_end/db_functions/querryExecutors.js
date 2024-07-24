const pool = require('../db_connection/connection');

/**
 * Registers a new therapist in the system.
 * 
 * @async
 * @function registerTherapist
 * @param {Object} userDetails - The details of the therapist to be registered.
 * @param {string} userDetails.email_id - The email ID of the therapist.
 * @param {string} userDetails.password - The password for the therapist's account.
 * @param {string} userDetails.first_name - The first name of the therapist.
 * @param {string} userDetails.last_name - The last name of the therapist.
 * @param {string} userDetails.contact_number - The contact number of the therapist.
 * @param {string} userDetails.city - The city where the therapist is located.
 * @param {string} userDetails.province - The province where the therapist is located.
 * @param {string} userDetails.education - The education details of the therapist.
 * @param {string} userDetails.specialization - The specialization of the therapist.
 * @param {string} userDetails.training - The training details of the therapist.
 * @param {number} userDetails.years_of_experience - The years of experience the therapist has.
 * @param {string} userDetails.expertise - The areas of expertise of the therapist.
 * @param {string} userDetails.answer - The security answer for account recovery.
 * @returns {Promise<Object>} Returns an object indicating success or failure and the user ID if successful.
 * 
 * @throws Will return an error object if the registration process fails.
 */
const registerTherapist = async (userDetails) => {
    let connection
    try{
        connection = await pool.getConnection();
        //Esatblishing Connection for Transaction
        await connection.beginTransaction();

        //Insert into UserTable
        const insertUserQuerry = `CALL RegisterTherapist(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
        ?, @p_user_id);`;

        // Execute the query with user details
        await connection.query(insertUserQuerry, [
            userDetails.email_id,
            userDetails.password,
            userDetails.first_name,
            userDetails.last_name,
            userDetails.contact_number,
            userDetails.city,
            userDetails.province,
            userDetails.education,
            userDetails.specialization,
            userDetails.training,
            userDetails.years_of_experience,
            userDetails.expertise,
            userDetails.answer
        ]);

        // Retrieve the userId from the result set
        const [rows] = await connection.query(`SELECT @p_user_id AS userId`);
        const user_Id = rows[0].userId;

        await connection.commit();

        return { success: true, user_Id};
    } catch (err) {
        if (connection) {
            await connection.rollback();
        }
        console.error('Error during registration: ', err);
        return { success: false, message: 'Registration failed', error: err.message };
    } finally{
        if(connection) {
            connection.release();
        }
    }
};

/**
 * Logs in a user by checking the provided credentials.
 * 
 * @async
 * @function login_user
 * @param {string} email - The email of the user attempting to log in.
 * @param {string} password - The password of the user attempting to log in.
 * @returns {Promise<Object>} Returns an object indicating success or failure and the user ID if successful.
 * 
 * @throws Will return an error object if the login process fails.
 */
const login_user = async (email, password) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Call the stored procedure for login
        const login_querry = `CALL LoginUser(?, ?, @p_user_id, @p_is_valid);`;
        await connection.query(login_querry, [email, password]);

        // Retrieve the results
        const [rows] = await connection.query(`SELECT @p_user_id AS userId, @p_is_valid AS isValid;`);
        const userId = rows[0].userId;
        const isValid = rows[0].isValid;

        if (!isValid) {
            await connection.rollback();
            return { success: false, message: 'Invalid email or password' };
        }

        await connection.commit();
        return { success: true, userId };
    } catch (err) {
        if (connection) {
            await connection.rollback();
        }
        console.error('Error during login: ', err);
        return { success: false, message: 'Login failed', error: err.message };
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

/**
 * Creates a new patient profile by calling a stored procedure and returns the new patient's ID.
 * 
 * @param {Object} patientDetails - The details of the patient to be added.
 * @param {string} patientDetails.first_name - The first name of the patient.
 * @param {string} patientDetails.last_name - The last name of the patient.
 * @param {string} patientDetails.guardian_first_name - The first name of the patient's guardian.
 * @param {string} patientDetails.guardian_last_name - The last name of the patient's guardian.
 * @param {string} patientDetails.email_id - The email ID of the patient.
 * @param {string} patientDetails.contact_number - The contact number of the patient.
 * @param {string} patientDetails.date_of_birth - The date of birth of the patient.
 * @param {string} patientDetails.gender - The gender of the patient.
 * @param {string} patientDetails.medical_history - The medical history of the patient.
 * @param {string} patientDetails.avatar - The avatar URL of the patient.
 * @param {string} patientDetails.therapist_id - The ID of the therapist assigned to the patient.
 * 
 * @returns {Promise<Object>} - A promise that resolves to an object containing the success status and the patient ID if successful.
 */
const new_patient_profile = async(patientDetails) => {
    let connection;
    try{
        // Get a connection from the pool
        connection = await pool.getConnection();

        // Begin a transaction
        await connection.beginTransaction();

        // SQL query to call the stored procedure for adding a patient
        const patient_profile_querry = `CALL AddPatient(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @p_patient_id);`;
        await connection.query(patient_profile_querry,[
            patientDetails.first_name,
            patientDetails.last_name,
            patientDetails.guardian_first_name,
            patientDetails.guardian_last_name,
            patientDetails.email_id,
            patientDetails.contact_number,
            patientDetails.date_of_birth,
            patientDetails.gender,
            patientDetails.medical_history,
            patientDetails.avatar,
            patientDetails.therapist_id
        ]);

        // Retrieve the patient ID from the result set
        const [rows] = await connection.query(`SELECT @p_patient_id AS patientId`);
        const patientId = rows[0].patientId;

        // Commit the transaction
        await connection.commit();

        // Check if the patient ID is null and return the appropriate response
        if(patientId === null){
            return { success: false, message: 'Failed to create patient profile'};
        }

        return {success: true, patientId};

    } catch (err) {
        // Rollback the transaction in case of an error
        if (connection) {
            await connection.rollback();
        }
        console.error('Error during creating new patient profile: ', err);
        return { success: false, message: 'Failed to create patient profile', error: err.message };
    } finally{
        // Release the connection back to the pool
        if(connection){
            connection.release();
        }
    }
};

/**
 * Starts a new session by calling a stored procedure and returns the new session's ID.
 * 
 * @param {Object} sessionDetails - The details of the session to be started.
 * @param {number} sessionDetails.patientId - The ID of the patient for whom the session is being started.
 * @param {number} sessionDetails.therapistId - The ID of the therapist who will conduct the session.
 * 
 * @returns {Promise<Object>} - A promise that resolves to an object containing the success status and the session ID if successful.
 */
const startNewSession = async(sessionDetails) => {
    let connection;
    try{
        // Get a connection from the pool
        connection = await pool.getConnection();

        // Begin a transaction
        await connection.beginTransaction();

        // SQL query to call the stored procedure for starting a new session
        const sessionQuery = `CALL StartNewSession(?, ?, @p_session_id);`;

        // Execute the stored procedure with the provided session details
        await connection.query(sessionQuery, [
            sessionDetails.patientId,
            sessionDetails.therapistId,
        ]);

        // Retrieve the session ID from the result set
        const [rows] = await connection.query(`SELECT @p_session_id AS sessionId`);
        const sessionId = rows[0].sessionId;

         // Check if the session ID is null and return the appropriate response
        if (sessionId === null) {
            return { success: false, message: 'Failed to start new session', sessionId};
        }

        // Commit the transaction
        await connection.commit();
        return { success: true, sessionId };
    } catch (err) {
        // Rollback the transaction in case of an error
        if (connection) {
            await connection.rollback();
        }
        console.error('Error during starting new session: ', err);
        return { success: false, message: 'Failed to start new session', error: err.message, sessionId: null };
    } finally {
        // Release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
};

/**
 * Adds a new assessment by calling a stored procedure.
 * 
 * @param {Object} assessmentDetails - The details of the assessment to be added.
 * @param {number} assessmentDetails.sessionId - The ID of the session associated with this assessment.
 * @param {string} assessmentDetails.head - The head assessment details.
 * @param {boolean} assessmentDetails.headFlag - Flag indicating a specific condition related to the head assessment.
 * @param {string} assessmentDetails.trunk - The trunk assessment details.
 * @param {boolean} assessmentDetails.trunkFlag - Flag indicating a specific condition related to the trunk assessment.
 * @param {string} assessmentDetails.pelvic - The pelvic assessment details.
 * @param {boolean} assessmentDetails.pelvicFlag - Flag indicating a specific condition related to the pelvic assessment.
 * @param {string} assessmentDetails.headAnt - The head anterior assessment details.
 * @param {boolean} assessmentDetails.headAntFlag - Flag indicating a specific condition related to the head anterior assessment.
 * @param {string} assessmentDetails.thoracic - The thoracic assessment details.
 * @param {boolean} assessmentDetails.thoracicFlag - Flag indicating a specific condition related to the thoracic assessment.
 * @param {string} assessmentDetails.lumbar - The lumbar assessment details.
 * @param {boolean} assessmentDetails.lumbarFlag - Flag indicating a specific condition related to the lumbar assessment.
 * @param {string} assessmentDetails.trunkInclination - The trunk inclination assessment details.
 * @param {boolean} assessmentDetails.trunkInclinationFlag - Flag indicating a specific condition related to the trunk inclination assessment.
 * @param {string} assessmentDetails.pelvicTilt - The pelvic tilt assessment details.
 * @param {boolean} assessmentDetails.pelvicTiltFlag - Flag indicating a specific condition related to the pelvic tilt assessment.
 * @param {string} assessmentDetails.hip - The hip assessment details.
 * @param {boolean} assessmentDetails.hipFlag - Flag indicating a specific condition related to the hip assessment.
 * @param {string} assessmentDetails.knee - The knee assessment details.
 * @param {boolean} assessmentDetails.kneeFlag - Flag indicating a specific condition related to the knee assessment.
 * @param {string} assessmentDetails.elbow - The elbow assessment details.
 * @param {boolean} assessmentDetails.elbowFlag - Flag indicating a specific condition related to the elbow assessment.
 * 
 * @returns {Promise<Object>} - A promise that resolves to an object containing the success status and a message.
 */
const addNewAssessment = async (assessmentDetails) => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.getConnection();

        // Begin a transaction
        await connection.beginTransaction();

        // SQL query to call the stored procedure for adding a new assessment
        const assessmentQuery = `CALL AddNewAssessment(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?, ?, ?, ?);`;

        // Execute the stored procedure with the provided assessment details
        await connection.query(assessmentQuery, [
            assessmentDetails.sessionId,
            assessmentDetails.head,
            assessmentDetails.headFlag,
            assessmentDetails.trunk,
            assessmentDetails.trunkFlag,
            assessmentDetails.pelvic,
            assessmentDetails.pelvicFlag,
            assessmentDetails.headAnt,
            assessmentDetails.headAntFlag,
            assessmentDetails.thoracic,
            assessmentDetails.thoracicFlag,
            assessmentDetails.lumbar,
            assessmentDetails.lumbarFlag,
            assessmentDetails.trunkInclination,
            assessmentDetails.trunkInclinationFlag,
            assessmentDetails.pelvicTilt,
            assessmentDetails.pelvicTiltFlag,
            assessmentDetails.hip,
            assessmentDetails.hipFlag,
            assessmentDetails.knee,
            assessmentDetails.kneeFlag,
            assessmentDetails.elbow,
            assessmentDetails.elbowFlag
        ]);

        // Commit the transaction
        await connection.commit();
        return { success: true, message: 'Assessment added successfully' };
    } catch (err) {
        // Rollback the transaction in case of an error
        if (connection) {
            await connection.rollback();
        }
        console.error('Error during adding new assessment: ', err);
        return { success: false, message: 'Failed to add new assessment', error: err.message };
    } finally {
        // Release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
};

/**
 * Retrieves an assessment by session ID by calling a stored procedure.
 * 
 * @param {number} sessionId - The ID of the session for which the assessment is to be retrieved.
 * 
 * @returns {Promise<Object>} - A promise that resolves to an object containing the success status and the assessment data if successful.
 */
const getAssessmentBySessionId = async (sessionId) => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.getConnection();
        
        // SQL query to call the stored procedure for getting an assessment by session ID
        const assessmentQuery = `CALL GetAssessmentBySessionId(?);`;

        // Execute the stored procedure with the provided session ID
        const [rows] = await connection.query(assessmentQuery, [sessionId]);

        // Return the retrieved assessment data
        return { success: true, data: rows[0] };
    } catch (err) {
        // Log the error and return a failure response with the error message
        console.error('Error during retrieving assessment: ', err);
        return { success: false, message: 'Failed to retrieve assessment', error: err.message };
    } finally {
        // Release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
};

/**
 * Retrieves patient information and sessions by calling a stored procedure.
 * If the most recent session exceeds 90 minutes, it ends the session and re-fetches the data.
 * 
 * @param {number} patientId - The ID of the patient whose information and sessions are to be retrieved.
 * @param {number} therapistId - The ID of the therapist associated with the patient.
 * 
 * @returns {Promise<Object>} - A promise that resolves to an object containing the success status, patient data, and session data if successful.
 */
const getPatientInfoAndSessions = async (patientId, therapistId) => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.getConnection();
        
        // SQL query to call the stored procedure for getting patient info and sessions
        const procedureQuery = `CALL GetPatientInfoAndSessions(?, ?);`;
        let [patientInfo] = await connection.query(procedureQuery, [patientId, therapistId]);

        const sessionLength = patientInfo[1].length;

        // End the session if it exceeds 90 minutes
        if(sessionLength > 0 && patientInfo[1][sessionLength - 1].end_session == 0) {
            
            const givenDateTime = new Date(patientInfo[1][sessionLength - 1].session_startTime);
            const currentDate = new Date();

            const diffMs = currentDate - givenDateTime; // Difference in milliseconds
            const diffMinutes = diffMs / (1000 * 60); // Convert milliseconds to minutes

            if(diffMinutes > 90) {
                // End the session if it exceeds 90 minutes
                await endSession(patientInfo[1][sessionLength - 1].session_id);
                // Re-fetch the data after ending the session
                [patientInfo] = await connection.query(procedureQuery, [patientId, therapistId]);
            }
        }

        // Check if patient data is found
        if (patientInfo[0].length > 0) {
            return { 
                success: true, 
                patientData: patientInfo[0], 
                sessionData: patientInfo[1] 
            };
        } else {
            return { 
                success: false, 
                message: 'No data found for the given patient and therapist ID' 
            };
        }
    } catch (err) {
        // Log the error and return a failure response with the error message
        console.error('Error during retrieving patient info and sessions: ', err);
        return { 
            success: false, 
            message: 'Failed to retrieve patient info and sessions', 
            error: err.message 
        };
    } finally {
        // Release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
};

/**
 * Retrieves a list of patients associated with a given therapist by calling a stored procedure.
 * 
 * @param {number} therapistId - The ID of the therapist whose patient list is to be retrieved.
 * 
 * @returns {Promise<Object>} - A promise that resolves to an object containing the success status and the list of patients if successful.
 */
const getPatientList = async (therapistId) => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.getConnection();

        // SQL query to call the stored procedure for getting the list of patients
        const patientListQuery = `CALL GetPatients(?);`;

        // Execute the stored procedure with the provided therapist ID
        const [result] = await connection.query(patientListQuery, [therapistId]);

        // Check if any patients were found and return the appropriate response
        if (result[0].length > 0) {
            return { 
                success: true, 
                patientList: result[0]  
            };
        } else {
            return { 
                success: false, 
                message: 'No data found for the given patient and therapist ID' 
            };
        }
    } catch (err) {
        // Log the error and return a failure response with the error message
        console.error('Error during retrieving patient list:', err);
        return {
            success: false,
            message: 'Failed to retrieve patient info and sessions',
            error: err.message
        };
    } finally {
        // Release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
};

/**
 * Updates a therapist's profile by calling a stored procedure.
 * 
 * @param {Object} therapistDetails - The details of the therapist to be updated.
 * @param {number} therapistDetails.therapist_id - The ID of the therapist.
 * @param {string} therapistDetails.first_name - The first name of the therapist.
 * @param {string} therapistDetails.last_name - The last name of the therapist.
 * @param {string} therapistDetails.contact_number - The contact number of the therapist.
 * @param {string} therapistDetails.city - The city where the therapist is located.
 * @param {string} therapistDetails.province - The province where the therapist is located.
 * @param {string} therapistDetails.education - The education details of the therapist.
 * @param {string} therapistDetails.specialization - The specialization of the therapist.
 * @param {string} therapistDetails.training - The training details of the therapist.
 * @param {number} therapistDetails.years_of_experience - The number of years of experience the therapist has.
 * @param {string} therapistDetails.expertise - The areas of expertise of the therapist.
 * 
 * @returns {Promise<Object>} - A promise that resolves to an object containing the success status and a message.
 */
const updateTherapistProfile = async (therapistDetails) => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // SQL query to call the stored procedure for updating the therapist profile
        const updateProfileQuery = `
        CALL UpdateTherapistProfile(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

        // Execute the stored procedure with the provided therapist details
        await connection.query(updateProfileQuery, [therapistDetails.therapist_id,
            therapistDetails.first_name,
            therapistDetails.last_name,
            therapistDetails.contact_number,
            therapistDetails.city,
            therapistDetails.province,
            therapistDetails.education,
            therapistDetails.specialization,
            therapistDetails.training,
            therapistDetails.years_of_experience,
            therapistDetails.expertise
        ]);

        // Commit the transaction
        await connection.commit();

        return {
            success: true,
            message: 'Therapist profile updated successfully'

        };
    } catch (err) {
        // Rollback the transaction in case of an error
        console.error('Error during updating therapist profile:', err);
        return {
            success: false,
            message: 'Failed to update therapist profile',
            error: err.message
        };
    } finally {
        // Release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
};

/**
 * Retrieves therapist details by calling a stored procedure.
 * 
 * @param {number} therapistId - The ID of the therapist whose details are to be retrieved.
 * 
 * @returns {Promise<Object>} - A promise that resolves to an object containing the success status and therapist details if successful.
 */
const getTherapistDetails = async (therapistId) => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.getConnection();
        
        // SQL query to call the stored procedure for getting therapist details
        const therapistDetailsQuery = `CALL GetTherapistInfo(?);`;

        // Execute the stored procedure with the provided therapist ID
        const [result] = await connection.query(therapistDetailsQuery, [therapistId]);

        // Check if therapist data is found and return the appropriate response
        if (result[0].length > 0){
            return{
                success : true,
                therapistDetails : result[0]
            }
        } else {
            return{
                success : false,
                message : 'No data found for given therapist'
            }
        }
    } catch (err) {
        // Log the error and return a failure response with the error message
        console.error('Error during fetching therapist Details:', err);
        return {
            success: false,
            message: 'Failed to retrieve therapist profile',
            error: err.message
        };
    } finally {
        // Release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
};

/**
 * Updates a patient's profile by calling a stored procedure.
 * 
 * @param {Object} data - The details of the patient to be updated.
 * @param {number} data.patient_id - The ID of the patient.
 * @param {number} data.therapist_id - The ID of the therapist associated with the patient.
 * @param {string} data.first_name - The first name of the patient.
 * @param {string} data.last_name - The last name of the patient.
 * @param {string} data.guardian_first_name - The first name of the patient's guardian.
 * @param {string} data.guardian_last_name - The last name of the patient's guardian.
 * @param {string} data.email_id - The email ID of the patient.
 * @param {string} data.contact_number - The contact number of the patient.
 * @param {string} data.date_of_birth - The date of birth of the patient.
 * @param {string} data.gender - The gender of the patient.
 * @param {string} data.medical_history - The medical history of the patient.
 * @param {string} data.avatar - The avatar URL of the patient.
 * 
 * @returns {Promise<Object>} - A promise that resolves to an object containing the success status and a message.
 */
const updatePatientProfile = async (data) => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // SQL query to call the stored procedure for updating the patient profile
        updateQuery = `CALL UpdatePatientInfo( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        // Execute the stored procedure with the provided patient details
        await connection.query( updateQuery, [data.patient_id,
            data.therapist_id,
            data.first_name,
            data.last_name,
            data.guardian_first_name,
            data.guardian_last_name,
            data.email_id,
            data.contact_number,
            data.date_of_birth,
            data.gender,
            data.medical_history,
            data.avatar
        ]);

        // Commit the transaction
        await connection.commit();

        return {
            success: true,
            message: 'Patient profile updated successfully'
        };
    } catch (err) {
        // Rollback the transaction in case of an error
        console.error('Error during updating Patient profile:', err);
        return {
            success: false,
            message: 'Failed to update Patient profile',
            error: err.message
        };
    } finally {
        // Release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
};

/**
 * Ends a session by calling a stored procedure.
 * 
 * @param {number} session_id - The ID of the session to be ended.
 * 
 * @returns {Promise<Object>} - A promise that resolves to an object containing the success status and a message.
 */
const endSession = async (session_id)  => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // SQL query to call the stored procedure for ending a session
        const endSessionQuery = `CALL endSession(?)`;

        // Execute the stored procedure with the provided session ID
        await connection.query(endSessionQuery, [session_id]);

        // Commit the transaction
        await connection.commit();

        return{
            success: true,
            message: "session Ended"
        }
    } catch (err) {
        // Rollback the transaction in case of an error
        console.error('Error during ending session:', err);
        return {
            success: false,
            message: 'Failed to end session',
            error: err.message
        };
    } finally {
        // Release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
};

/**
 * Authenticates a researcher by calling a stored procedure.
 * 
 * @param {string} email - The email address of the researcher.
 * @param {string} password - The password of the researcher.
 * 
 * @returns {Promise<Object>} - A promise that resolves to an object containing the success status, researcher ID if successful, and a message.
 */
const login_research = async (email, password) => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // SQL query to call the stored procedure for researcher login
        const login_querry = `CALL LoginResearcher(?, ?, @p_user_id, @p_is_valid);`;

        // Execute the stored procedure with the provided email and password
        await connection.query(login_querry, [email, password]);

        // Retrieve the results from the stored procedure
        const [rows] = await connection.query(`SELECT @p_user_id AS userId, @p_is_valid AS isValid;`);
        const researcherId = rows[0].userId;
        const isValid = rows[0].isValid;

        // Check if the credentials are valid
        if (!isValid) {
            await connection.rollback();
            return { success: false, message: 'Invalid email or password' };
        }

        // Commit the transaction
        await connection.commit();
        return { success: true, researcherId };
    } catch (err) {
        // Rollback the transaction in case of an error
        if (connection) {
            await connection.rollback();
        }
        console.error('Error during login: ', err);
        return { success: false, message: 'Login failed', error: err.message };
    } finally {
        // Release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
};

/**
 * Verifies a user by calling a stored procedure and retrieves the password if the verification is successful.
 * 
 * @param {Object} userData - The data required to verify the user.
 * @param {string} userData.email - The email address of the user.
 * @param {string} userData.answer - The security answer provided by the user.
 * 
 * @returns {Promise<Object>} - A promise that resolves to an object containing the success status and either the password or an error message.
 */
const verifyUser = async (userData) => {
    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // SQL query to call the stored procedure for verifying the user
        const verifyUserQuery = `CALL verifyUserAnswer(?, ?, @p_verify, @p_password);`;
        await connection.query(verifyUserQuery, [
            userData.email,
            userData.answer
        ]);

        // Execute the stored procedure with the provided email and security answer
        const [result] = await connection.query(`SELECT @p_verify AS isValid, @p_password AS password;`);
        const isValid = result[0].isValid;
        const password = result[0].password;

        // Retrieve the results from the stored procedure
        if(!isValid) {
            return {
                success : false,
                message : "emailID or security Answer is wrong."
            };
        } else {
            return {
                success : true, password
            };
        }
    } catch (err) {
        // Rollback the transaction in case of an error
        if (connection) {
            await connection.rollback();
        }
        console.error('Error occured: ', err);
        return { success: false, message: 'Password recovery fail', error: err.message };
    } finally {
        // Release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
};

/**
 * Retrieves research data by calling a stored procedure.
 * 
 * @returns {Promise<Object>} - A promise that resolves to an object containing the success status and research data if successful.
 */
const getResearchData = async () => {
    let connection;
    try{
        // Get a connection from the pool
        connection = await pool.getConnection();

        // SQL query to call the stored procedure for getting research data
        const getDataQuery = `CALL GetResearchData();`;

        // Execute the stored procedure
        const [result] = await connection.query(getDataQuery);

        // Return the retrieved research data
        return {
            success : true,
            therapist : result[0],
            patient : result[1],
            session : result[2],
            assessment : result[3]
        }
    } catch (err) {
        // Rollback the transaction in case of an error
        if (connection) {
            await connection.rollback();
        }
        console.error('Error occured: ', err);
        return { success: false, message: 'Failed to Fetch Research data', error: err.message };
    } finally {
        // Release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
};

module.exports = {
    registerTherapist,
    login_user,
    new_patient_profile,
    startNewSession,
    addNewAssessment,
    getAssessmentBySessionId,
    getPatientInfoAndSessions,
    getPatientList,
    updateTherapistProfile,
    getTherapistDetails,
    updatePatientProfile,
    endSession,
    login_research,
    verifyUser,
    getResearchData
};