import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Label } from '@radix-ui/react-label';

const SignupPage = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }); 

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    
    let hasErrors = false;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    if (!name) {
      newErrors.name = 'Name is required';
      hasErrors = true;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Valid email is required';
      hasErrors = true;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      hasErrors = true;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    try { 
      const response = await fetch('https://clikiserver.vercel.app/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // alert('User registered successfully');
        navigate('/userlogin');
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
        <div className="form-group">
          <Label htmlFor="name">Name</Label>
          <input className='inputregform' id="name" name="name" type="text" value={formData.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <Label htmlFor="email">Email</Label>
          <input className='inputregform' id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <Label htmlFor="password">Password</Label>
          <input className='inputregform' id="password" name="password" type="password" value={formData.password} onChange={handleChange} />
        </div>

        <div className="form-group">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <input className='inputregform' id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
        </div>

        <div className="form-errors">
          {errorMessages}
        </div>
      
        <button type="submit" style={{width: '100%', borderRadius: '4px'}}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
