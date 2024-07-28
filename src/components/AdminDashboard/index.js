import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({ name: '', description: '', price: '', imageUrl: '' });
  const [errors, setErrors] = useState({ name: '', description: '', price: '', imageUrl: '', general: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, imageUrl } = productData;

    let hasErrors = false;
    const newErrors = { name: '', description: '', price: '', imageUrl: '', general: '' };
    if (!name) { newErrors.name = 'Name is required'; hasErrors = true; }
    if (!description) { newErrors.description = 'Description is required'; hasErrors = true; }
    if (!price) { newErrors.price = 'Price is required'; hasErrors = true; }
    if (!imageUrl) { newErrors.imageUrl = 'Image URL is required'; hasErrors = true; }
    if (hasErrors) { setErrors(newErrors); return; }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://clikiserver.vercel.app/api/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(productData),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Item added to inventory');
        setProductData({ name: '', description: '', price: '', imageUrl: '' });
        setErrors({ name: '', description: '', price: '', imageUrl: '', general: '' });
        navigate('/products');
      } else {
        setErrors({ ...errors, general: data.msg });
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ ...errors, general: 'Server Error' });
      setSuccessMessage('');
    }
  };

  const errorMessages = Object.values(errors).filter(error => error).join(', ');

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Add Product</h1>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input className='inputregform' id="name" name="name" type="text" value={productData.name} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input className='inputregform' id="description" name="description" type="text" value={productData.description} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input className='inputregform' id="price" name="price" type="number" value={productData.price} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input className='inputregform' id="imageUrl" name="imageUrl" type="text" value={productData.imageUrl} onChange={handleChange}/>
        </div>
        <div style={{ width: '100%', textAlign: 'center', fontSize: '10px', color: successMessage ? 'green' : 'red' }} className="form-errors">
          {successMessage || errorMessages}
        </div>
        <button style={{ width: '100%', borderRadius: '5px', padding: '20px 0px' }} type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
