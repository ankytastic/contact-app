const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// MySQL Connection Pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Test Database Connection
(async () => {
  try {
    await db.getConnection();
    console.log('Connected to MySQL');
  } catch (err) {
    console.error('Error connecting to MySQL:', err);
  }
})();

// API Routes
app.use('/contacts', require('./routes/contacts')(db));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/contacts', async (req, res) => {
    const { firstName, lastName, email, phone, company, jobTitle } = req.body;
  
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const [result] = await db.execute(
        `INSERT INTO contacts (first_name, last_name, email, phone, company, job_title) VALUES (?, ?, ?, ?, ?, ?)`,
        [firstName, lastName, email, phone, company, jobTitle]
      );
      res.status(201).json({ message: 'Contact added successfully', contactId: result.insertId });
    } catch (error) {
      console.error('Error adding contact:', error);
      res.status(500).json({ message: 'Failed to add contact' });
    }
  });
  
