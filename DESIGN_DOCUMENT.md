# Design Document

## Project Name
Organ Transplant Management System

## Purpose
Provide a simplified platform for managing organ donors, recipients, and transplant matching while supporting user roles and approval flows.

## Scope
The system includes:
- User registration and login
- Donor registration and administration
- Recipient waiting list management
- Organ inventory and availability tracking
- Recipient matching based on organ type, blood group, tissue compatibility, urgency, and waiting time
- Transplant acceptance recording

## Architecture Overview

The application is a standard full-stack web app with two layers:

1. Backend: Spring Boot REST API
   - Controllers expose API endpoints
   - Services implement business logic
   - Repositories communicate with the database via JPA
   - Models map to relational tables

2. Frontend: React SPA
   - Vite-powered app with React Router
   - Components for login, registration, dashboard, and domain management
   - Central API utility wraps `fetch`

### Deployment Diagram

- Browser -> React frontend (`frontend/`) on `http://localhost:5173`
- Frontend API calls -> Spring Boot backend (`backend/`) on `http://localhost:8080`
- Backend stores data in MySQL

## Technologies

- Backend
  - Java 17
  - Spring Boot 4.0.5
  - Spring Data JPA
  - Spring Web MVC
  - MySQL Connector/J
  - Lombok

- Frontend
  - React 19
  - Vite
  - React Router DOM 7
  - ESLint

## Component Breakdown

### Backend Components

#### Controllers
- `AuthController` - register and login operations
- `DonorController` - donor CRUD
- `RecipientController` - recipient CRUD and urgency update
- `OrganController` - organ creation and available organ listing
- `MatchingController` - match recipients to a selected organ
- `TransplantController` - accept organ allocations

#### Services
- `AuthService` - checks for duplicate users and validates login credentials
- `DonorService` - enforces living donor age rules and updates donor fields
- `RecipientService` - manages waiting list entries and urgency updates
- `OrganService` - lists only organs with status `AVAILABLE`
- `MatchingService` - filters recipients by organ type, blood group, tissue compatibility, and sorts by critical condition, urgency, and waiting duration
- `TransplantService` - marks organ and recipient as transplanted and records a transplant event

#### Repositories
- `UserRepository` - find users by email
- `DonorRepository` - standard donor persistence
- `RecipientRepository` - standard recipient persistence
- `OrganRepository` - lookup available organs by status
- `TransplantRecordRepository` - save transplant records

#### Models
- `User` - identity, authentication, role, hospital
- `Donor` - donor demographics and type
- `Recipient` - waiting list patient details and urgency
- `Organ` - organ metadata and status
- `TransplantRecord` - transplant event audit

### Frontend Components

#### Pages
- `Login.jsx` - authenticates users
- `Register.jsx` - creates new users
- `Dashboard.jsx` - role-aware navigation cards
- `RecipientPage.jsx` - add recipients, view list, update urgency, delete
- `DonorPage.jsx` - add donors, view list, update and delete donors
- `OrganPage.jsx` - add organs, view available organs, start matching
- `MatchingPage.jsx` - display matched recipients and allocate organs

#### UI Components
- `Navbar.jsx` - persistent navigation and logout action

#### API Client
- `api.js` - base fetch wrapper for all backend calls

## Data Model Details

### `User`
Fields
- `id`: Long
- `name`: String
- `email`: String
- `password`: String
- `role`: String (`ADMIN`, `COORDINATOR`, `SURGEON`)
- `hospital`: String
- `createdAt`: LocalDateTime

Behavior
- Stored in MySQL table `users`
- Email uniqueness checked during registration
- Password compared in plaintext during login

### `Donor`
Fields
- `id`: Long
- `name`: String
- `donorType`: String (`LIVING`, `DECEASED`)
- `bloodGroup`: String
- `tissueType`: String
- `age`: Integer
- `causeOfDeath`: String
- `donationDate`: LocalDate
- `hospital`: String

Behavior
- Living donors must be at least 18 years old
- `donationDate` defaults to current date

### `Recipient`
Fields
- `id`: Long
- `registrationNumber`: String
- `name`: String
- `age`: Integer
- `bloodGroup`: String
- `organNeeded`: String
- `urgencyScore`: Integer
- `waitingSince`: LocalDate
- `medicalCondition`: String
- `tissueType`: String
- `height`: Double
- `weight`: Double
- `status`: String (`WAITING`, `MATCHED`, `TRANSPLANTED`, etc.)

Behavior
- `waitingSince` defaults to current date
- `status` defaults to `WAITING`

### `Organ`
Fields
- `id`: Long
- `donorId`: Long
- `organType`: String
- `bloodGroup`: String
- `tissueType`: String
- `preservationStartTime`: LocalDateTime
- `preservationEndTime`: LocalDateTime
- `status`: String (`AVAILABLE`, `TRANSPLANTED`, etc.)

Behavior
- `status` defaults to `AVAILABLE`
- `preservationStartTime` defaults to current timestamp

### `TransplantRecord`
Fields
- `id`: Long
- `recipientId`: Long
- `donorId`: Long
- `organId`: Long
- `transplantDate`: LocalDate
- `performedBy`: String
- `outcome`: String
- `followUpStatus`: String
- `dischargeDate`: LocalDate

Behavior
- `transplantDate` defaults to current date

## Matching Flow

1. User selects an available organ from `/organs`
2. Frontend requests `/api/matching/{organId}`
3. Backend fetches the organ and verifies its availability
4. It filters recipients by:
   - `status == WAITING`
   - `organNeeded` matches `organType`
   - `bloodGroup` matches
   - `tissueType` compatibility (Yes/No match)
5. It sorts recipients by:
   - `medicalCondition == Critical` first
   - highest `urgencyScore`
   - earliest `waitingSince`
6. Matching results are returned to the frontend
7. The user may allocate an organ by calling `/api/transplant/accept`

## Transplant Acceptance Behavior

- The selected organ status changes to `TRANSPLANTED`
- The recipient status changes to `TRANSPLANTED`
- A `TransplantRecord` is created with the selected organ, recipient, donor, and performer

## User Experience

### Roles
- `ADMIN` and `COORDINATOR` can manage donors and recipients
- `SURGEON` can view organs and accept matches
- All roles can log in and access the dashboard

### UI Flow
- Login or register
- Dashboard presents links to domains
- Manage recipients, donors, and organs through dedicated pages
- Match an available organ and allocate it to a recipient

## Non-Functional Requirements

- Basic data persistence using MySQL
- Simple RESTful API design
- Client-side navigation using React Router
- Frontend/backend separation with CORS support

## Known Limitations

- Passwords are not hashed
- No JWT or token-based authentication
- Minimal backend validation beyond basic business rules
- No frontend form validation for all edge cases
- Current matching is synchronous and in-memory per request
- No transplant history page is implemented yet

## Future Improvements

- Add secure authentication and authorization
- Hash passwords and protect API endpoints
- Add comprehensive validation and error display on the frontend
- Persist transplant history and expose it via API
- Add unit and integration tests for backend and frontend
- Add search, pagination, and status dashboards
- Build role-specific UI permissions more robustly

## Assumptions

- The system operates in a trusted environment for internal hospital staff
- MySQL is available and accessible on the configured host
- Users are assigned meaningful roles at registration
- Donor IDs are provided when adding organs
