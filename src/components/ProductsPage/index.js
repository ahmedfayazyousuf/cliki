import { RxCross2 } from "react-icons/rx";
import { MdShoppingCart } from "react-icons/md";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { useAtom } from 'jotai/react';
import { cartAtom, cartUpdateAtom } from '../../atoms/cartAtom';
import Logo from '../1_MediaAssets/Images/BrandAssets/LogoMainGreen.png';
import { NavLink } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cart, setCart] = useAtom(cartAtom);
  const [, updateCart] = useAtom(cartUpdateAtom);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/userlogin');
        return;
      }

      try {
        const response = await fetch('https://clikiserver.vercel.app/api/products', {
          method: 'GET',
          headers: {
            'x-auth-token': token
          }
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          setError('Failed to fetch products');
          if (response.status === 401) {
            navigate('/userlogin');
          }
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Server Error');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleAddToCart = (productId, price, name) => {
    updateCart({ productId, price, name });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (newCart[productId] && newCart[productId].quantity > 0) {
        newCart[productId].quantity -= 1;
        if (newCart[productId].quantity === 0) {
          delete newCart[productId];
        }
      }
      return newCart;
    });
  };

  const calculateTotal = () => {
    return Object.values(cart).reduce((total, item) => {
      const quantity = item.quantity || 0;
      const price = item.price || 0;
      return total + (quantity * price);
    }, 0);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="products-container">
      {error && <div className="error-message">{error}</div>}
      <div className="products-grid">
        {products.map((product) => {
          const quantityInCart = cart[product._id]?.quantity || 0;

          return (
            <div key={product._id} className="product-card">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <div className='product-text-holder'>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">AED {product.price}</p>
                <div className="product-actions">
                  <button onClick={() => handleRemoveFromCart(product._id)}>-</button>
                  <span className="product-quantity">{quantityInCart}</span>
                  <button onClick={() => handleAddToCart(product._id, product.price, product.name)}>+</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <NavLink className="nav-link" to="/" style={{position: 'absolute', top: '10px', left: '10px'}}>
        <img src={Logo} alt='Logo' style={{width: '100px', marginTop: '7px'}} />
      </NavLink>

      <button className="cart-button" onClick={() => setOpen(true)}>
        <MdShoppingCart style={{fontSize: '20px'}} />
      </button>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="cart-overlay" />
          <Dialog.Content className="cart-content">
            <div className="cart-title">
              <h3>Cart</h3>
              <Dialog.Close className="cart-close"><RxCross2 /></Dialog.Close>
            </div>
            <div className="cart-body">
              {Object.keys(cart).length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                Object.entries(cart).map(([productId, { quantity, price, name }]) => (
                  <div key={productId} style={{borderBottom: '1px solid #ddd', padding: '10px 0px', marginBottom: '0px', width: '100%', fontSize: '12px'}}>
                    <strong> Product Name: </strong> 
                    {name} <br />
                    <strong> Quantity: </strong> 
                    {quantity} <br />
                    <strong> Rate: </strong> 
                    AED {price}
                  </div>
                ))
              )}
              <h4 style={{width: '100%', textAlign: 'center'}}>Total: AED {calculateTotal()}</h4>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default ProductsPage;
