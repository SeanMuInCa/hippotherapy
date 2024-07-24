DELIMITER //

USE hippotherapy//

-- Procedure for Ending Session
CREATE PROCEDURE endSession (
    IN p_session_id INT
)

BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- An error has occurred, rollback the transaction
        ROLLBACK;
    END;

    -- Start a new transaction
    START TRANSACTION;

    -- Update the Therapists table
    UPDATE sessions
    SET
        end_session = TRUE
    WHERE session_id = p_session_id;

    COMMIT;
END//

-- procedure for fetching therapist details
CREATE PROCEDURE GetTherapistInfo(IN therapistId INT)
BEGIN
    SELECT 
        t.therapist_id,
        t.first_name,
        t.last_name,
        t.contact_number,
        t.city,
        t.province,
        td.education,
        td.specialization,
        td.training,
        td.years_of_experience,
        td.expertise
    FROM 
        Therapists t
    JOIN 
        Therapist_Details td ON t.therapist_id = td.therapist_id
    WHERE 
        t.therapist_id = therapistId;
END//

-- procedure for fetching patient details and sessions conducted on the patient
CREATE PROCEDURE GetPatientInfoAndSessions (
    IN p_patient_id INT,
    IN p_therapist_id INT
)
BEGIN
    -- Retrieve patient information
    SELECT 
        first_name, 
        last_name, 
        guardian_first_name, 
        guardian_last_name, 
        email_id, 
        contact_number, 
        date_of_birth, 
        gender, 
        medical_history, 
        avatar
    FROM 
        Patients
    WHERE 
        patient_id = p_patient_id
        AND therapist_id = p_therapist_id;

    -- Retrieve sessions conducted on the patient
    SELECT 
        session_id, 
        session_startTime,
        end_session
    FROM 
        Sessions
    WHERE 
        patient_id = p_patient_id
        AND therapist_id = p_therapist_id;
END //

-- procedure for fetching research data for researcher
CREATE PROCEDURE GetResearchData()
BEGIN
    -- Select therapist information
    SELECT 
        t.therapist_id AS Therapist_ID, 
        td.education, 
        td.specialization, 
        td.training, 
        td.years_of_experience, 
        td.expertise
    FROM 
        Therapists t
    JOIN 
        Therapist_Details td ON t.therapist_id = td.therapist_id;

    -- Select patient information
    SELECT 
        p.patient_id, 
        p.gender, 
        p.therapist_id
    FROM 
        Patients p;

    -- Select session information
    SELECT 
        s.session_id, 
        s.patient_id, 
        s.therapist_id, 
        s.session_startTime, 
        s.end_session, 
        td.years_of_experience, 
        td.education
    FROM 
        Sessions s
    JOIN 
        Therapist_Details td ON s.therapist_id = td.therapist_id;

    -- Select entire assessment table
    SELECT * FROM Assessment;
END //

-- procedure for fetching list of patients provided a therapist id
USE hippotherapy//

CREATE PROCEDURE GetPatients(
    IN therapistId INT
)
BEGIN
    SELECT 
        patient_id,
        first_name,
        last_name,
        guardian_first_name,
        guardian_last_name,
        email_id,
        contact_number,
        date_of_birth,
        gender,
        medical_history,
        avatar
    FROM 
        Patients
    WHERE 
        therapist_id = therapistId;
END //

-- procedure for log-in for therapist
CREATE PROCEDURE LoginUser (
    IN p_email_id CHAR(255),
    IN p_password CHAR(255),
    OUT p_user_id INT,
    OUT p_is_valid BOOLEAN
)
BEGIN
    DECLARE v_stored_password CHAR(255);
    DECLARE done INT DEFAULT 0;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- Initialize output parameters
    SET p_user_id = NULL;
    SET p_is_valid = FALSE;

    proc_block: BEGIN -- Start labeled block
        -- Fetch user ID and stored password
        SELECT User_id, password INTO p_user_id, v_stored_password
        FROM Users
        WHERE email_id = p_email_id;

        -- Check if user was found
        IF done = 1 THEN
            SET p_is_valid = FALSE;
            LEAVE proc_block;
        END IF;

        -- Check password
        IF v_stored_password = p_password THEN
            SET p_is_valid = TRUE;
        ELSE
            SET p_is_valid = FALSE;
        END IF;

    END proc_block; -- End labeled block
END //

-- procedure for generating new porcedure
CREATE PROCEDURE AddNewAssessment(
    IN p_session_id INT,
    IN p_head INT,
    IN p_head_flag ENUM('left', 'right', 'center'),
    IN p_trunk INT,
    IN p_trunk_flag ENUM('left', 'right', 'center'),
    IN p_pelvic INT,
    IN p_pelvic_flag ENUM('left', 'right', 'center'),
    IN p_head_ant INT,
    IN p_head_ant_flag ENUM('left', 'right', 'center'),
    IN p_thoracic INT,
    IN p_thoracic_flag ENUM('left', 'right', 'center'),
    IN p_lumbar INT,
    IN p_lumbar_flag ENUM('left', 'right', 'center'),
    IN p_trunk_inclination INT,
    IN p_trunk_inclination_flag ENUM('left', 'right', 'center'),
    IN p_pelvic_tilt INT,
    IN p_pelvic_tilt_flag ENUM('left', 'right', 'center'),
    IN p_hip INT,
    IN p_hip_flag ENUM('left', 'right', 'center'),
    IN p_knee INT,
    IN p_knee_flag ENUM('left', 'right', 'center'),
    IN p_elbow INT,
    IN p_elbow_flag ENUM('left', 'right', 'center')
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback the transaction in case of any error
        ROLLBACK;
    END;

    START TRANSACTION;

    INSERT INTO Assessment (
        assessment_id,
        head,
        head_flag,
        trunk,
        trunk_flag,
        pelvic,
        pelvic_flag,
        head_ant,
        head_ant_flag,
        thoracic,
        thoracic_flag,
        lumbar,
        lumbar_flag,
        trunk_inclination,
        trunk_inclination_flag,
        pelvic_tilt,
        pelvic_tilt_flag,
        hip,
        hip_flag,
        knee,
        knee_flag,
        elbow,
        elbow_flag
    ) VALUES (
        p_session_id,
        p_head,
        p_head_flag,
        p_trunk,
        p_trunk_flag,
        p_pelvic,
        p_pelvic_flag,
        p_head_ant,
        p_head_ant_flag,
        p_thoracic,
        p_thoracic_flag,
        p_lumbar,
        p_lumbar_flag,
        p_trunk_inclination,
        p_trunk_inclination_flag,
        p_pelvic_tilt,
        p_pelvic_tilt_flag,
        p_hip,
        p_hip_flag,
        p_knee,
        p_knee_flag,
        p_elbow,
        p_elbow_flag
    );

    -- Commit the transaction if everything is fine
    COMMIT;
END //

-- procedure for creating new patient profile
CREATE PROCEDURE AddPatient(
    IN p_first_name VARCHAR(100),
    IN p_last_name VARCHAR(100),
    IN p_guardian_first_name VARCHAR(100),
    IN p_guardian_last_name VARCHAR(100),
    IN p_email_id VARCHAR(255),
    IN p_contact_number VARCHAR(20),
    IN p_date_of_birth DATE,
    IN p_gender VARCHAR(10),
    IN p_medical_history TEXT,
    IN p_avatar TEXT,
    IN p_therapist_id INT,
    OUT p_patient_id INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback the transaction in case of any error
        ROLLBACK;
        SET p_patient_id = NULL;
    END;

    -- Start the transaction
    START TRANSACTION;

    -- Insert the new patient into the Patients table
    INSERT INTO Patients (
        first_name, 
        last_name, 
        guardian_first_name, 
        guardian_last_name, 
        email_id, 
        contact_number, 
        date_of_birth, 
        gender, 
        medical_history,
        avatar,
        therapist_id
    ) VALUES (
        p_first_name, 
        p_last_name, 
        p_guardian_first_name, 
        p_guardian_last_name, 
        p_email_id, 
        p_contact_number, 
        p_date_of_birth, 
        p_gender, 
        p_medical_history, 
        p_avatar,
        p_therapist_id
    );
    
    -- Retrieve the last inserted ID (patient_id)
    SET p_patient_id = LAST_INSERT_ID();

    -- Commit the transaction
    COMMIT;
END//

-- procedure for starting a new session
USE hippotherapy//

CREATE PROCEDURE StartNewSession (
    IN p_patient_id INT,
    IN p_therapist_id INT,
    OUT p_session_id INT
)
BEGIN

    DECLARE v_education TEXT;
    DECLARE v_years_of_experience INT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback the transaction if an error occurs
        ROLLBACK;
        set p_session_id = null;
	END;

    START TRANSACTION;
    
    -- Fetch education and years_of_experience from Therapist_Details table
    SELECT education, years_of_experience
    INTO v_education, v_years_of_experience
    FROM Therapist_Details
    WHERE therapist_id = p_therapist_id;

    -- Insert the new session into the Sessions table
    INSERT INTO Sessions (patient_id, therapist_id, education, years_of_experience)
    VALUES (p_patient_id, p_therapist_id, v_education, v_years_of_experience);
    
    -- Retrieve the last inserted session ID
    SET p_session_id = LAST_INSERT_ID();
    
    COMMIT;
END //

-- procedure for log-in for researcher
CREATE PROCEDURE LoginResearcher (
    IN p_email_id CHAR(255),
    IN p_password CHAR(255),
    OUT p_user_id INT,
    OUT p_is_valid BOOLEAN
)
BEGIN
    DECLARE v_stored_password CHAR(255);
    DECLARE done INT DEFAULT 0;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- Initialize output parameters
    SET p_user_id = NULL;
    SET p_is_valid = FALSE;

    proc_block: BEGIN -- Start labeled block
        -- Fetch user ID and stored password
        SELECT researcher_id, password INTO p_user_id, v_stored_password
        FROM researchers
        WHERE email_id = p_email_id;

        -- Check if user was found
        IF done = 1 THEN
            SET p_is_valid = FALSE;
            LEAVE proc_block;
        END IF;

        -- Check password
        IF v_stored_password = p_password THEN
            SET p_is_valid = TRUE;
        ELSE
            SET p_is_valid = FALSE;
        END IF;

    END proc_block; -- End labeled block
END //

-- procedure for fecthing session information
CREATE PROCEDURE GetAssessmentBySessionId(IN sessionId INT)
BEGIN
    SELECT
        assessment_id,
        time_of_saving,
        head,
        head_flag,
        trunk,
        trunk_flag,
        pelvic,
        pelvic_flag,
        head_ant,
        head_ant_flag,
        thoracic,
        thoracic_flag,
        lumbar,
        lumbar_flag,
        trunk_inclination,
        trunk_inclination_flag,
        pelvic_tilt,
        pelvic_tilt_flag,
        hip,
        hip_flag,
        knee,
        knee_flag,
        elbow,
        elbow_flag,
        total_score
    FROM
        Assessment
    WHERE
        assessment_id = sessionId;
END //

-- procedure for therapist registeration
CREATE PROCEDURE RegisterTherapist(
    IN p_email_id CHAR(255),
    IN p_password CHAR(255),
    IN p_first_name CHAR(255),
    IN p_last_name CHAR(255),
    IN p_contact_number CHAR(20),
    IN p_city CHAR(255),
    IN p_province CHAR(255),
    IN p_education CHAR(255),
    IN p_specialization CHAR(255),
    IN p_training CHAR(255),
    IN p_years_of_experience INT,
    IN p_expertise CHAR(255),
    IN p_security_answer CHAR(255),
    OUT last_insert_id INT
)
BEGIN
    -- Start a transaction
    START TRANSACTION;

    -- Insert into Users table
    INSERT INTO Users (email_id, Password, security_answer) VALUES (p_email_id, p_password, p_security_answer);
    SET last_insert_id = LAST_INSERT_ID();

    -- Insert into Therapists table
    INSERT INTO Therapists (therapist_id, first_name, last_name, contact_number, city, province)
    VALUES (last_insert_id, p_first_name, p_last_name, p_contact_number, p_city, p_province);

    -- Insert into Therapist_Details table
    INSERT INTO Therapist_Details (therapist_id, education, specialization, training, years_of_experience, expertise)
    VALUES (last_insert_id, p_education, p_specialization, p_training, p_years_of_experience, p_expertise);

    -- Commit the transaction
    COMMIT;
END//

-- procedure for updating therapist details
CREATE PROCEDURE UpdateTherapistProfile (
    IN p_therapist_id INT,
    IN p_first_name VARCHAR(100),
    IN p_last_name VARCHAR(100),
    IN p_contact_number VARCHAR(20),
    IN p_city VARCHAR(100),
    IN p_province VARCHAR(100),
    IN p_education TEXT,
    IN p_specialization TEXT,
    IN p_training TEXT,
    IN p_years_of_experience INT,
    IN p_expertise TEXT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- An error has occurred, rollback the transaction
        ROLLBACK;
    END;

    -- Start a new transaction
    START TRANSACTION;

    -- Update the Therapists table
    UPDATE Therapists
    SET 
        first_name = p_first_name,
        last_name = p_last_name,
        contact_number = p_contact_number,
        city = p_city,
        province = p_province
    WHERE therapist_id = p_therapist_id;

    -- Update the Therapist_Details table
    UPDATE Therapist_Details
    SET 
        education = p_education,
        specialization = p_specialization,
        training = p_training,
        years_of_experience = p_years_of_experience,
        expertise = p_expertise
    WHERE therapist_id = p_therapist_id;

    -- If everything is successful, commit the transaction
    COMMIT;
END //

-- procedure for updating patient profile
CREATE PROCEDURE UpdatePatientInfo(
    IN p_patient_id INT,
    IN p_therapist_id INT,
    IN p_first_name VARCHAR(100),
    IN p_last_name VARCHAR(100),
    IN p_guardian_first_name VARCHAR(100),
    IN p_guardian_last_name VARCHAR(100),
    IN p_email_id VARCHAR(255),
    IN p_contact_number VARCHAR(20),
    IN p_date_of_birth DATE,
    IN p_gender VARCHAR(10),
    IN p_medical_history TEXT,
    IN p_avatar TEXT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback the transaction in case of an error
        ROLLBACK;
    END;

    START TRANSACTION;

    -- Update the patient information only if the patient ID and therapist ID match
    UPDATE Patients
    SET 
        first_name = p_first_name,
        last_name = p_last_name,
        guardian_first_name = p_guardian_first_name,
        guardian_last_name = p_guardian_last_name,
        email_id = p_email_id,
        contact_number = p_contact_number,
        date_of_birth = p_date_of_birth,
        gender = p_gender,
        medical_history = p_medical_history,
        avatar = p_avatar
    WHERE 
        patient_id = p_patient_id AND
        therapist_id = p_therapist_id;
        
	COMMIT;
END //

-- process for verifying user for password recovery
CREATE PROCEDURE verifyUserAnswer (
    IN p_email CHAR(255),
    IN p_answer CHAR(255),
    OUT p_is_valid BOOLEAN,
    OUT p_password CHAR(255)
)

BEGIN
    DECLARE v_stored_answer CHAR(255);
    DECLARE v_stored_password CHAR(255);
    DECLARE done INT DEFAULT 0;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    SET p_is_valid = FALSE;
    SET p_password = NULL;

    proc_block: BEGIN -- Start labeled block
        -- Fetch user ID and stored password
        SELECT security_answer, password INTO v_stored_answer, v_stored_password
        FROM users
        WHERE email_id = p_email;

        -- Check if user was found
        IF done = 1 THEN
            SET p_is_valid = FALSE;
            LEAVE proc_block;
        END IF;

        -- Check password
        IF v_stored_answer = p_answer THEN
            SET p_is_valid = TRUE;
            SET p_password = v_stored_password;
        ELSE
            SET p_is_valid = FALSE;
        END IF;

    END proc_block; -- End labeled block
END //