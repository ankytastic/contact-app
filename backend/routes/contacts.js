const express = require('express');

const router = express.Router();

module.exports = (db) => {
  // Add a new contact
  router.post('/contacts', async (req, res) => {
    const { firstName, lastName, email, phone, company, jobTitle } = req.body;
    try {
      const result = await db.query(
        'INSERT INTO contacts (firstName, lastName, email, phone, company, jobTitle) VALUES (?, ?, ?, ?, ?, ?)',
        [firstName, lastName, email, phone, company, jobTitle]
      );
  
      // Return the inserted contact with all details
      const insertedContact = {
        id: result.insertId,
        firstName,
        lastName,
        email,
        phone,
        company,
        jobTitle,
      };
  
      res.status(201).json(insertedContact);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error adding contact');
    }
  });

  // Get all contacts
  router.get('/', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM contacts');
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Update a contact
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone, company, jobTitle } = req.body;

    try {
      await db.query(
        'UPDATE contacts SET first_name = ?, last_name = ?, email = ?, phone = ?, company = ?, job_title = ? WHERE id = ?',
        [firstName, lastName, email, phone, company, jobTitle, id]
      );
      res.status(200).json({ id, ...req.body });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Delete a contact
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
      await db.query('DELETE FROM contacts WHERE id = ?', [id]);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
