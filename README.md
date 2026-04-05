## Client Relationship Manager Application 

## Overview
This project is a full-stack CRM (Client Relationship Management) system designed to support sales and client management activities. The system enables users to manage client data, track tasks, and improve workflow efficiency through a structured and user-friendly interface.

The application is built using a modern web architecture, integrating both frontend and backend technologies, along with version control and CI/CD practices.

## Features

* Authentication
    * Signup (as an employee)
    * Login
    * Logout
    * Role-based access control(Admin / Manager / Employee)

* Client Management
    * Add clients
    * View clients
    * Update clients
    * Delete clients

* Task Management

    * Add tasks
    * View tasks
    * Update tasks
    * Delete tasks

* User Management
    * Update profile
    * Admin Role management

## System Description
This application is designed to support efficient client and task management within a CRM system. It provides users with essential functionalities to manage daily operations, including handling client information and tracking tasks through a simple and intuitive interface.

By integrating authentication and role-based access control, the system ensures that users have appropriate access permissions, improving both security and usability in a professional environment.

---

## CI/CD Workflow

This project integrates GitHub Actions to automate development workflows:
	•	Automatically runs on push to main
	•	Ensures code consistency and deployment readiness
	•	Supports continuous integration practices

## GitHub Version Control Strategy

The project follows a structured Git workflow:
    - Feature branches are created for each functionality
    - Changes are committed with clear messages
    - Pull Requests are used for merging into main
    - All major features are merged through PRs

Example branches used:
    - `client` — Client management feature development
    - `task` — Task management feature development  
    - `taskfeatures` — Additional task feature enhancements

## Deployment

The system is deployed on AWS EC2. Due to AWS security group restrictions in the student account, HTTP (port 80) and custom TCP (port 5001) inbound rules are configured with "My IP" instead of 0.0.0.0/0, as the university's IAM policy automatically removes rules that allow all IP addresses. As a result, the public URL may only be accessible from the IP address configured at the time of submission. If access is unavailable during marking, please contact the student to update the security group rules.

## Live Demo:
	•	Public URL: http://15.135.187.115
	•	Login credentials:
	| Role | Employee ID | Password |
    |------|------------|----------|
    | Employee | E-100 | 12345 |
    | Manager | E-1234 | 1234 |
    | Admin | E-12345 | 12345 |

---
## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Authentication | JWT (JSON Web Token) |
| Web Server | Nginx (Reverse Proxy) |
| Process Manager | PM2 |
| CI/CD | GitHub Actions |
| Cloud | AWS EC2 (Ubuntu 24.04) |



## Local Setup Instructions
* Prerequisite:
Please install the following software and create account in the following web tools

* Nodejs: [https://nodejs.org/en]
* Git: [https://git-scm.com/]
* VS code editor: [https://code.visualstudio.com/]
* MongoDB Account: [https://account.mongodb.com/account/login]
* GitHub Account: [https://github.com/signup?source=login]
    ### Step 1: Clone the Repository
    
    ```bash
    git clone https://github.com/Ryan-hoho/taskmanager.git
    cd taskmanager
    ```
    
    ### Step 2: Configure Backend Environment Variables
    
    ```bash
    cd backend
    touch .env
    ```
    
    Open the `.env` file and add the following:
    
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    PORT=5001
    ```
    
    > **How to get MONGO_URI:** Log in to MongoDB Atlas → Create a cluster → Click "Connect" → Copy the connection string and replace `<password>` with your database password.
    
    ### Step 3: Install Backend Dependencies and Start
    
    ```bash
    npm install --global yarn
    yarn install
    npm run start
    ```
    
    The backend will run on **http://localhost:5001**
    
    ### Step 4: Configure Frontend
    
    ```bash
    cd ../frontend
    ```
    
    Open `src/axiosConfig.jsx` and make sure the baseURL points to your local backend:
    
    ```js
    const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001',
    });
    ```
    
    ### Step 5: Install Frontend Dependencies and Start
    
    ```bash
    yarn install
    yarn start
    ```
    
    The frontend will run on **http://localhost:3000**
 
---
 
##  CI/CD Pipeline
 
This project uses **GitHub Actions** with a self-hosted runner deployed on AWS EC2.
 
### Workflow Trigger
- Automatically runs on push to the `main` branch  
- Ensures code consistency and deployment readiness  
- Supports continuous integration practices  
 
### Pipeline Steps
 
| Step | Description |
|------|-------------|
| 1 | Checkout repository code |
| 2 | Setup Node.js v22 |
| 3 | Stop PM2 processes (`pm2 stop all`) |
| 4 | Write `.env` file from GitHub Secrets |
| 5 | Install backend dependencies (`yarn install`) |
| 6 | Install frontend dependencies and build (`yarn run build`) |
| 7 | Run backend tests (`npm test`) |
| 8 | Restart PM2 processes (`pm2 restart all`) |
 
### GitHub Secrets Required
 
| Secret Name | Description |
|-------------|-------------|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | JWT authentication secret key |
| `PORT` | Backend port number (5001) |
| `PROD` | All production environment variables combined |


## 🖥️ Server Configuration (AWS EC2)
 
| Setting | Value |
|---------|-------|
| OS | Ubuntu 24.04 LTS |
| Instance Type | t3.medium |
| Web Server | Nginx (port 80 → port 3000) |
| Process Manager | PM2 |
 
### PM2 Process Status
 
| ID | Name | Status | Port |
|----|------|--------|------|
| 0 | backend | online | 5001 |
| 1 | Frontend | online | 3000 |



## Future Improvements
	•	Add dashboard analytics (sales pipeline visualization)
	•	Improve UI/UX design consistency
	•	Implement notification system
	•	Enhance security (e.g., rate limiting, logging)


## Author
    Name: Tzu-Chen, Ho
    Student ID: N12310221
    Course: IFN636
    Institution: QUT