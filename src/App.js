import React, { useState } from 'react';
import Login from './Login'; // Adjust the path if needed
import ImprovedPOSUI from './Possytem'; // Adjust the path if needed
import './App.css';
function App() {
  // State to manage the current page
  const [currentPage, setCurrentPage] = useState('login'); // Start with the login page

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setCurrentPage('pos'); // Navigate to POS page after login
  };

  // Function to handle navigation to the payment page
  const handleProceedToPayment = () => {
    setCurrentPage('payment'); // Navigate to Payment page
  };

  // Function to handle navigating back to the POS page from payment
  const handleBackToPOS = () => {
    setCurrentPage('pos'); // Navigate back to POS page
  };

  // Render components conditionally based on the current page
  return (
    <div className="App">
      {currentPage === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
      {currentPage === 'pos' && <ImprovedPOSUI onProceedToPayment={handleProceedToPayment} />}
      {currentPage === 'payment' && <ImprovedPOSUI onBackToPOS={handleBackToPOS} showPayment={true} />}
    </div>
  );
}

export default App;