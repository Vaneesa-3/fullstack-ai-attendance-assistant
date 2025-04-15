# Full Stack AI Attendance Assistant

## Overview

**Full Stack AI Attendance Assistant** is an intelligent tool built to help students manage their attendance more effectively by predicting faculty presence and calculating how skipping classes affects their attendance percentage. This project leverages **Machine Learning (Logistic Regression)** to provide accurate predictions on faculty attendance for each class hour.

## Features

- **Predict Faculty Presence**: Uses Machine Learning to predict if a professor will attend a class based on historical data.  
- **Attendance Tracker**: Calculates current attendance percentage for each subject.  
- **Class Skip Impact**: Estimates how skipping a specific class will affect the student's overall attendance.  
- **Catch-Up Guide**: Tells you how many extra classes need to be attended to maintain 75% attendance.  
- **Cute AI Bot**: A friendly animated bot to guide you through the experience.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (with animations!)  
- **Backend**: Node.js, Express  
- **Machine Learning Engine**: Python (Logistic Regression with scikit-learn)  
- **Data Handling**: pandas (for CSV-based dataset processing)

## How It Works

- **Frontend**: Collects the day and hour information from the user and sends it to the backend.  
- **Backend**: Node.js server receives the request, calls the Python script, and returns predictions to the frontend.  
- **Machine Learning**: A Logistic Regression model trained on historical class data predicts faculty presence.  
- **Data**: Processed from a CSV file including class timings, subject names, and faculty availability.

## Installation

### Prerequisites

- Node.js (for backend)  
- Python (for Machine Learning)  
- npm (for managing packages)

### Usage

1. Enter the day (e.g., `Monday`) and hour (e.g., `3`) for which you want to check the professor’s attendance.  
2. The AI will predict whether the professor will attend the class.  
3. It will also show your current attendance and how many extra classes you need to attend to stay above 75%.

