### **Contact Management Application**  

This contact management application, named **Contact-App**, allows users to add, edit, delete, and view contacts. It features a responsive UI built using React and Material-UI, a backend API developed with Node.js/Express, and a MySQL database for data storage.

---

### **Features**  
- Add new contacts with form validation for required fields.  
- Edit existing contact details.  
- Delete contacts with a confirmation prompt.  
- Display all contacts in a responsive tabular format.  
- Backend API to handle CRUD operations.  

---

### **Technical Stack**  
- **Frontend:** React.js and Material-UI (MUI) components.  
- **Backend:** Node.js with Express.js.  
- **Database:** MySQL for data persistence.  

---

### **Setup Instructions**  

#### **1. Prerequisites**  
Ensure you have the following installed on your machine:  
- Node.js  
- MySQL  
- A package manager like npm or yarn  

#### **2. Clone the repository**  
```bash  
git clone https://github.com/ankytastic/contact-app  
cd contact-app  
```  

#### **3. Install dependencies**  
```bash  
cd frontend  
npm install  
cd ../backend  
npm install  
```  

#### **4. Set up the database**  
- Create a MySQL database:  
  ```sql  
  CREATE DATABASE contact_management;  
  ```  
- Use the following script to create the `contacts` table:  
  ```sql  
  CREATE TABLE contacts (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    firstName VARCHAR(255) NOT NULL,  
    lastName VARCHAR(255) NOT NULL,  
    email VARCHAR(255) NOT NULL,  
    phone VARCHAR(10) NOT NULL,  
    company VARCHAR(255),  
    jobTitle VARCHAR(255)  
  );  
  ```  

#### **5. Configure the backend**  
- Create a `.env` file in the `backend` directory with the following content:  
  ```env  
  DB_HOST=localhost  
  DB_USER=<your-mysql-username>  
  DB_PASSWORD=<your-mysql-password>  
  DB_NAME=contact_management  
  PORT=5000  
  ```  

#### **6. Start the backend server**  
```bash  
cd backend  
npm start  
```  

#### **7. Start the frontend development server**  
```bash  
cd frontend  
npm start  
```  

#### **8. Access the application**  
Open your browser and navigate to `http://localhost:3000`.  

---

### **How It Works**  

#### **Frontend**  
1. **Form Handling**  
   - The `ContactForm` component is used for adding and editing contacts.  
   - Validation ensures:  
     - Email addresses are in a valid format.  
     - Phone numbers meet length requirements.  
     - Required fields are not left blank.  

2. **Data Display**  
   - The `ContactTable` component presents all contacts in a responsive table using Material-UI.  
   - Each row includes options to edit or delete the contact.  

#### **Backend**  
1. **API Endpoints**  
   - `GET /contacts`: Retrieve all contacts.  
   - `POST /contacts`: Add a new contact.  
   - `PUT /contacts/:id`: Update an existing contact.  
   - `DELETE /contacts/:id`: Delete a contact.  

2. **Validation**  
   - Backend validation ensures data integrity during form submission.  

#### **Database**  
- MySQL is used to store contact details.  
- Each contact has a unique ID, enabling efficient updates and deletions.  

---

### **Challenges and Solutions**  

#### **Challenge 1: Missing Contact Fields in Frontend Table**  
- **Problem:** Some fields (e.g., `firstName`, `lastName`) were not displayed in the frontend table after adding or editing a contact.  
- **Solution:**  
  - Ensured the backend API returned the complete contact object in the response.  
  - Updated the frontend state with the API response to correctly reflect all fields.  

#### **Challenge 2: Form Validation**  
- **Problem:** Invalid data (e.g., improperly formatted emails, missing required fields) could be submitted.  
- **Solution:**  
  - Added robust validations in the `ContactForm` component.  
  - Displayed error messages when validation checks failed.  

#### **Challenge 3: Frontend-Backend Integration**  
- **Problem:** Maintaining synchronization between frontend and backend state after adding or editing contacts was challenging.  
- **Solution:**  
  - Updated the frontend state with the response from the backend API to ensure consistency.  

---

This application integrates essential features of a contact management system using React and Material-UI for a responsive UI, Node.js for a robust backend, and MySQL for efficient data management.