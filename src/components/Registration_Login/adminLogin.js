import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label } from '@radix-ui/react-label';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('https://clikiserver.vercel.app/api/users/auth', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token
            }
          });
          if (response.ok) {
            navigate('/admindashboard');
          }
        } catch (err) {
          console.error('Error checking auth:', err);
        }
      }
    };

    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    let hasErrors = false;
    const newErrors = {
      email: '',
      password: '',
      general: ''
    };

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Valid email is required';
      hasErrors = true;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('https://clikiserver.vercel.app/api/users/adminlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/admindashboard');
      } else {
        setErrors({ ...errors, general: data.msg });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ ...errors, general: 'Server Error' });
    }
  };

  const errorMessages = Object.values(errors).filter(error => error).join(', ');

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1 style={{ marginTop: '-5px' }}>Cliki admin</h1>
        <div className="form-group">
          <Label htmlFor="email">Email</Label>
          <input
            className='inputregform'
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <Label htmlFor="password">Password</Label>
          <input
            className='inputregform'
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="form-errors">
          {errorMessages}
        </div>

        <button
          type="submit"
          style={{ width: '100%', borderRadius: '4px' }}
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
