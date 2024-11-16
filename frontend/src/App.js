import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactTable from './components/ContactTable';
import { Container, Typography, Box } from '@mui/material';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  // Fetch contacts from the database
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://localhost:5000/contacts');
        if (response.ok) {
          const data = await response.json();
    
          // Log data to ensure all fields are present
          console.log('Fetched contacts:', data);
    
          // Update state with complete contact data
          setContacts(data);
        } else {
          console.error('Failed to fetch contacts');
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    

    fetchContacts();
  }, []);

  // Handle adding a new contact
  const handleAddContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  // Handle editing a contact
  const handleEdit = (contactToEdit) => {
    setEditingContact(contactToEdit);
  };

  // Handle deleting a contact
  const handleDelete = async (idToDelete) => {
    try {
      const response = await fetch(`http://localhost:5000/contacts/${idToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact.id !== idToDelete)
        );
      } else {
        console.error('Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Contact Management System
      </Typography>
      <Box mb={4}>
        <ContactForm onContactAdded={handleAddContact} editingContact={editingContact} />
      </Box>
      <ContactTable
        contacts={contacts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Container>
  );
};

export default App;
