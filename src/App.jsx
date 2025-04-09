import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Contacts from './Components/Contacts';
import AddContacts from './Components/AddContacts';
import Profile from './Components/Profile';
import Login from './Components/Login';
import Register from './Components/Register';
import Navbar from './Components/Navbar';

const App = () => {
  return (
   
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/add-contact" element={<AddContacts />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    
  );
};

export default App;