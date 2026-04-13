# Organ Transplant Management System

A full-stack healthcare application for managing organ donors, recipients, and transplant matching.

## Overview

This project combines a Spring Boot backend with a React/Vite frontend.

- Backend: `backend/` using Spring Boot, Spring Data JPA, MySQL.
- Frontend: `frontend/` using React 19, Vite, React Router.

The system supports:
- User registration and login
- Donor registration and management
- Recipient waiting list management
- Organ inventory registration
- Matching available organs to compatible recipients
- Recording transplant acceptance

## Key Features

### Backend
- REST API endpoints for authentication, donors, recipients, organs, matching, and transplant operations
- Data model using JPA entities and MySQL persistence
- Simple business rules for donor eligibility, recipient urgency, and matching criteria
- CORS configuration to allow the frontend from `http://localhost:5173`

### Frontend
- Login and registration screens
- Role-based dashboard navigation
- Recipient management with urgency updates and removal
- Donor management with add/update/remove operations
- Organ management with available organ registration and match search
- Matching screen to shortlist recipients and accept a transplant

## Architecture

- `backend/src/main/java/com/karthik/backend/` contains the Spring Boot application
- `frontend/src/` contains the React UI and API client
- `backend/src/main/resources/application.properties` configures MySQL and server port

## Setup Instructions

### Prerequisites
- Java 17
- Maven
- Node.js + npm
- MySQL running on `localhost:3306`

### Backend
1. Configure the database credentials in `backend/src/main/resources/application.properties`.
   - URL: `jdbc:mysql://localhost:3306/hospital?createDatabaseIfNotExist=true&useSSL=false`
   - Username: `root`
   - Password: `Sai@karthik05`
2. Start the backend server:
   - Windows: `cd backend && .\mvnw.cmd spring-boot:run`
   - Linux/macOS: `cd backend && ./mvnw spring-boot:run`
3. The backend runs on `http://localhost:8080`.

### Frontend
1. Install dependencies:
   - `cd frontend && npm install`
2. Start the frontend:
   - `npm run dev`
3. The frontend runs on `http://localhost:5173`.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with email/password

### Donors
- `POST /api/donors` - Add donor
- `GET /api/donors` - Get all donors
- `PUT /api/donors/{id}` - Update donor
- `DELETE /api/donors/{id}` - Delete donor

### Recipients
- `POST /api/recipients` - Add recipient
- `GET /api/recipients` - Get all recipients
- `PUT /api/recipients/{id}/urgency` - Update urgency score
- `DELETE /api/recipients/{id}` - Remove recipient

### Organs
- `POST /api/organs` - Add organ
- `GET /api/organs` - Get available organs

### Matching
- `GET /api/matching/{organId}` - Find recipient matches for an organ

### Transplants
- `POST /api/transplant/accept` - Accept organ allocation for a recipient

## Data Models

### User
- `id`, `name`, `email`, `password`, `role`, `hospital`, `createdAt`

### Donor
- `id`, `name`, `donorType`, `bloodGroup`, `tissueType`, `age`, `causeOfDeath`, `donationDate`, `hospital`

### Recipient
- `id`, `registrationNumber`, `name`, `age`, `bloodGroup`, `organNeeded`, `urgencyScore`, `waitingSince`, `medicalCondition`, `tissueType`, `height`, `weight`, `status`

### Organ
- `id`, `donorId`, `organType`, `bloodGroup`, `tissueType`, `preservationStartTime`, `preservationEndTime`, `status`

### TransplantRecord
- `id`, `recipientId`, `donorId`, `organId`, `transplantDate`, `performedBy`, `outcome`, `followUpStatus`, `dischargeDate`

## Frontend Routes

- `/login` - User authentication
- `/register` - Create new user
- `/` - Dashboard
- `/recipients` - Recipient management
- `/donors` - Donor management
- `/organs` - Organ inventory and match search
- `/matching/:organId` - Match organ to recipients

## Notes

- Authentication is stored in local storage and not protected by token-based security.
- Passwords are stored in plaintext in the database; this should be improved before production.
- The backend uses JPA auto-update mode (`spring.jpa.hibernate.ddl-auto=update`).

## Next Steps
- Add proper password hashing and authentication tokens
- Expand transplant history and follow-up reporting
- Add validation and error handling on the frontend for all forms
- Add unit / integration tests for backend services and controllers
