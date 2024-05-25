# Group 14:
- Jooeun Park - 301414492
- Jusung Park - 301415852
- Hong Quang Cung - 301417603
- Yun Fei Chen - 301363664

# UniKeep

## Project Description:
The application's name: UniKeep

The project aims to create a tool to help SFU students track living expenses, assignment progress, and evaluate resumes.

There are 3 major features of the web application:
1. Finance Service
2. Assignment's Progress
3. Resume Assessment

Additionally, there are other minor services supporting the application including:
1. Landing
2. Sign in
3. Sign up

-----

## User Stories for Major Features:

### **1. Budget Management:**

Users access Budget Management from the Home page. It includes:

- **Expense Dashboard:** Users track summary expenditure and group data by day, month, or year. Historical data retrieval is limited to 2 years.

- **Receipt Uploading:** Users upload receipt images/PDFs to extract and modify data. Approved data is stored in the database.

### **2. Assignment's Progress:**

Users can access Assignment's Progress from the Home page. It includes:

- **Assignment Dashboard:** Users monitor performance and mark tasks as "Done". Tasks are removed when completed or when deadlines pass. The app tracks up to 5 assignments.

- **Create Assignment:** Users create new assignments with descriptions and deadlines. The app generates tasks and workload distribution. Users can review and register to track progress.

### **3. Resume Assessment:**

Users access the Resume Assessment by choosing "Resume Assessment" on the Home page. It functions as a web form where users submit their resume in PDF format and receive feedback from the application.

-----

## User Stories for Minor Features:

### **1. Landing**

This is the first page of the application user will interact with. It provides options for the user to log in or register an account with the application.

### **2. Sign in**

Users need to sign in to the application before using other services.

### **3. Sign up**

If users do not have an account, they need to sign up for a new account to use services.

-----

## Architecture Design:
### **A. Tech Stack:**

- **Front End:** REACT.js
- **Back End:**
  - **Language:** JavaScript/TypeScript
  - **Framework:** Node.js, Express
  - **Database:** MongoDB
- **Other Storage:** Google Cloud Storage
- **(Reverse proxy) Web server:** Apache
- **Operating System:** Linux (Debian Bullseye)

### **B. Technical Architecture:**

The project adopts a microservices architecture, with each service featuring its backend to shield and conceal key information like URLs and API keys. The React server accesses these resources via APIs provided by the service backends. Services in the web application include:

1. **Reverse Proxy - Apache:**
   - "Apache" is the most popular web server for general purposes on the market, which is highly compatible with Linux (OS) that is selected for the project.

2. **Frontend Service/React Server:**
   - The decision to choose REACT is based on the knowledge domain of all team members since all team members have a solid foundation with REACT.

3. **Authorization Service - Google IDP:**
   - Using Google Identity Platform (IDP) as a third-party application simplifies project complexity. Its compatibility with the Google Cloud environment streamlines integration.

4. **AI Service - Azure AI Service (Document Intelligence) & ChatGPT:**
   - The choice of an AI service is solely determined by the knowledge base of the team members.

5. **Finance Service - Receipt Database (MongoDB):**
   - The Finance service stores data from the AI Azure Service, which reads receipt images. Since the extracted data is unstructured, with variations in items and services, a NoSQL database like MongoDB is suitable.

6. **Assignment Service - Assignment Database (MongoDB):**
   - The Assignment service handles user-provided assignments, which can be unstructured, varying in tasks and types. Therefore, opting for a NoSQL database is preferred over SQL to handle this data efficiently.

7. **Uploading Service - Upload's Metadata Database (MongoDB) and Upload Storage (Google Storage):**
   - Since the entire application is hosted in the Google Cloud environment, using Google Storage for storing uploaded files is the natural choice.
   - The uploaded files' metadata is often unstructured, with variable data types and additional fields like file names. Therefore, a flexible-schema NoSQL database like MongoDB is ideal for this scenario.

#### Architecture:

![Items](https://github.com/cungquang/Student_Wallet/assets/44489511/4dc2269e-741d-4d1a-886f-b1c65f4af287)

