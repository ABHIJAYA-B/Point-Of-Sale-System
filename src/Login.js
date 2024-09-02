import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    // Simulate login logic
    if (username === 'admin' && password === 'admin') {
      alert('Login successful!');
      onLoginSuccess(); // Call the function passed via props
    } else {
      alert('Invalid username or password');
    }
  };

  // Inline styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(to right, #1e90ff, #00bfff)',
      
    },
    titleee: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#fff', 
      marginBottom: '20px', 
      textAlign: 'center',
      justifyContent: 'column'
    },
    box: {
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      backgroundColor: '#fff',
      maxWidth: '400px',
      width: '100%',
      boxSizing: 'border-box'
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '24px',
      color: 'transparent', 
      background: 'linear-gradient(to right, #00bfff, #1e90ff)', // Gradient color
      WebkitBackgroundClip: 'text', // Clip background to text
      backgroundClip: 'text',
      fontWeight: 'bold'
    },
    form: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      marginBottom: '8px',
      fontSize: '16px',
      color: '#333'
    },
    input: {
      padding: '10px',
      marginBottom: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '16px'
    },
    button: {
      padding: '10px',
      borderRadius: '4px',
      border: 'none',
      background: 'linear-gradient(to right, #00bfff, #1e90ff)',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background 0.3s'
    },
    buttonHover: {
      background: 'linear-gradient(to right, #1e90ff, #00bfff)'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.titleee}>Welcome to StreetFood Wala!</h1>
      <div style={styles.box}>
        <h2 style={styles.title}>Login</h2>
        <div style={styles.form}>
          <label style={styles.label}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            style={styles.input}
          />
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={styles.input}
          />
          <button 
            onClick={onLogin} 
            style={styles.button}
            onMouseOver={(e) => e.currentTarget.style.background = styles.buttonHover.background}
            onMouseOut={(e) => e.currentTarget.style.background = styles.button.background}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
