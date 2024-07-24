CREATE DATABASE hippotherapy;

USE hippotherapy;

-- 1. User Table
CREATE TABLE Users (
    User_id INT AUTO_INCREMENT PRIMARY KEY,
    email_id VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    security_answer VARCHAR(255)
);

-- 2. Therapist Table
CREATE TABLE Therapists (
    therapist_id INT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    contact_number VARCHAR(20),
    city VARCHAR(100),
    province VARCHAR(100),
    FOREIGN KEY (therapist_id) REFERENCES Users(User_id)
);

-- 3. Therapist Details Table
CREATE TABLE Therapist_Details (
    therapist_id INT PRIMARY KEY,
    education TEXT,
    specialization TEXT,
    training TEXT,
    years_of_experience INT,
    expertise TEXT,
    FOREIGN KEY (therapist_id) REFERENCES Users(User_id)
);

-- 4. Patient Table
CREATE TABLE Patients (
    patient_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    guardian_first_name VARCHAR(100),
    guardian_last_name VARCHAR(100),
    email_id VARCHAR(255),
    contact_number VARCHAR(20),
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10),
    medical_history TEXT,
    avatar TEXT,
    therapist_id INT NOT NULL,
    FOREIGN KEY (therapist_id) REFERENCES Users(User_id)
);

-- 5. Session Table
CREATE TABLE Sessions (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    therapist_id INT NOT NULL,
    education TEXT NOT NULL,
    years_of_experience INT,
    session_startTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_session BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id),
    FOREIGN KEY (therapist_id) REFERENCES Users(User_id)
);

-- 6. Assessment Table
CREATE TABLE Assessment (
    assessment_id INT NOT NULL,
    time_of_saving TIMESTAMP NOT NULL DEFAULT current_timestamp,
    head INT NOT NULL,
    head_flag ENUM('left', 'right', 'center') NOT NULL,
    trunk INT NOT NULL,
    trunk_flag ENUM('left', 'right', 'center') NOT NULL,
    pelvic INT NOT NULL,
    pelvic_flag ENUM('left', 'right', 'center') NOT NULL,
    head_ant INT NOT NULL,
    head_ant_flag ENUM('left', 'right', 'center') NOT NULL,
    thoracic INT NOT NULL,
    thoracic_flag ENUM('left', 'right', 'center') NOT NULL,
    lumbar INT NOT NULL,
    lumbar_flag ENUM('left', 'right', 'center') NOT NULL,
    trunk_inclination INT NOT NULL,
    trunk_inclination_flag ENUM('left', 'right', 'center') NOT NULL,
    pelvic_tilt INT NOT NULL,
    pelvic_tilt_flag ENUM('left', 'right', 'center') NOT NULL,
    hip INT NOT NULL,
    hip_flag ENUM('left', 'right', 'center') NOT NULL,
    knee INT NOT NULL,
    knee_flag ENUM('left', 'right', 'center') NOT NULL,
    elbow INT NOT NULL,
    elbow_flag ENUM('left', 'right', 'center') NOT NULL,
    total_score INT AS (
        head + trunk + pelvic + head_ant + thoracic + lumbar + trunk_inclination +
        pelvic_tilt + hip + knee + elbow
    ),
    PRIMARY KEY (assessment_id, time_of_saving),
    FOREIGN KEY (assessment_id) REFERENCES Sessions(session_id)
);

CREATE TABLE Researchers (
    researcher_id INT AUTO_INCREMENT PRIMARY KEY,
    email_id VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);


INSERT INTO Researchers (email_id, password) 
VALUES ('mylena.medeiros@saskpolytech.ca', 'mylena@123');
