import React, { useState } from 'react';

const AddProduct = () => {
  const [productData, setProductData] = useState({ name: '', description: '', price: '', imageUrl: '' });
  const [errors, setErrors] = useState({ name: '', description: '', price: '', imageUrl: '', general: '' });

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
      const response = await fetch('http://localhost:5000/api/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(productData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Product added:', data);
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
        <div style={{width: '100%', textAlign: 'center', fontSize: '10px'}} className="form-errors">{errorMessages}</div>
        <button style={{width: '100%', borderRadius: '5px'}} type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
