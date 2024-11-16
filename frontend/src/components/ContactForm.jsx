import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';

const ContactForm = ({ onContactAdded, editingContact }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
  });

  useEffect(() => {
    if (editingContact) {
      setForm(editingContact);
    }
  }, [editingContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Validation logic
    if (!form.firstName || !form.lastName) {
      alert('First and last name are required.');
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(form.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      alert('Phone number must be 10 digits.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/contacts', {
        method: editingContact ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert(editingContact ? 'Contact updated successfully' : 'Contact added successfully');
        onContactAdded(await response.json());
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          jobTitle: '',
        });
      } else {
        console.error('Failed to save contact.');
      }
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Company"
            name="company"
            value={form.company}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Job Title"
            name="jobTitle"
            value={form.jobTitle}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {editingContact ? 'Update Contact' : 'Add Contact'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactForm;
