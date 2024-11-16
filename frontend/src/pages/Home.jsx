import React from 'react';
import ContactForm from '../components/ContactForm';
import ContactTable from '../components/ContactTable';

const Home = () => {
  return (
    <div>
      <h1>Contact Management</h1>
      <ContactForm />
      <ContactTable />
    </div>
  );
};

export default Home;