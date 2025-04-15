
#Full Stack AI Attendance Assistant
##Overview
Full Stack AI Attendance Assistant is an intelligent tool built to help students manage their attendance more effectively by predicting faculty presence and calculating how skipping classes affects their attendance percentage. This project leverages Machine Learning (Logistic Regression) to provide accurate predictions on faculty attendance for each class hour.

##Features
Predict Faculty Presence: Uses Machine Learning to predict if a professor will attend a class based on historical data.

Attendance Tracker: Calculates current attendance percentage for each subject.

Class Skip Impact: Estimates how skipping a specific class will affect the student's overall attendance.

Catch-Up Guide: Tells you how many extra classes need to be attended to maintain 75% attendance.

Cute AI Bot: A friendly animated bot to guide you through the experience.

##Tech Stack
Frontend: HTML, CSS, JavaScript (with animations!)

Backend: Node.js, Express

Machine Learning Engine: Python (Logistic Regression with scikit-learn)

Data Handling: pandas (for CSV-based dataset processing)

##How It Works
Frontend: The frontend collects the day and hour information from the user. The input is sent to the backend for processing.

Backend: The Node.js server processes the request, interacts with the Python script to fetch predictions, and returns the results to the frontend.

Machine Learning: A Logistic Regression model is trained on historical data to predict faculty presence. The model is tested using a separate test dataset for better accuracy.

Data: The data includes class timings, faculty presence, and subject-specific attendance, which is processed and displayed to the user.

##Installation
Prerequisites
Node.js (for backend)

Python (for Machine Learning)

npm (for managing packages)
Usage
Enter the day (e.g., "Monday") and hour (e.g., 3) for which you want to check the professor’s attendance.

The AI will predict whether the professor will attend the class and display your current attendance and how many extra classes you need to attend to reach 75%.
