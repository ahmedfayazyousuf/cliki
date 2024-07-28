import { FaLongArrowAltRight } from "react-icons/fa";
import './Navbar.css';
import '../../1_MediaAssets/Styles/App.scss';
import Burger from '../../1_MediaAssets/Images/BrandAssets/Burger.png';
import Logo from '../../1_MediaAssets/Images/BrandAssets/LogoMainGreen.png';
import { NavLink } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';

const NavbarUser = () => {
  const [isChecked, setIsChecked] = useState(false); 
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsChecked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(prev => !prev);
  };

  return (
    <nav className='NavbarUser' ref={navRef}>
      <input type="checkbox" id="check" checked={isChecked} onChange={handleCheckboxChange} />
      
      <NavLink className="nav-link" to="/">
        <img src={Logo} alt='Logo' style={{width: '100px', marginTop: '7px'}} />
      </NavLink>
 
      <label htmlFor="check" className="checkbtn">
        <img src={Burger} alt='Burger' className='Burger' style={{width: '27px', height: '22px'}} />
      </label>
      
      <ul className={`nav-menu ${isChecked ? 'open' : ''}`}>
        <li>
          <NavLink className="nav-link" onClick={() => setIsChecked(false)} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" onClick={() => setIsChecked(false)} to="/products">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" onClick={() => setIsChecked(false)} to="/adminlogin">
            Admin
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link shower" onClick={() => setIsChecked(false)} to="/userlogin">
            Login
          </NavLink>
        </li>  
        <li>
          <NavLink className="nav-link shower" onClick={() => setIsChecked(false)} to="/userregistration">
            Sign up
          </NavLink>
        </li>  
        <div className="hider" style={{position: 'absolute', right: '20px'}}>
          <li>
            <NavLink className="nav-link hider" onClick={() => setIsChecked(false)} to="/userlogin">
              <button style={{padding: '5px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #459779', background: 'transparent', color: '#459779', fontWeight: '900'}}>
                  Login <FaLongArrowAltRight />
              </button>
            </NavLink>
          </li> 
          <li>
            <NavLink className="nav-link hider" onClick={() => setIsChecked(false)} to="/userregistration">
              <button style={{padding: '5px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  Sign up <FaLongArrowAltRight />
              </button>
            </NavLink>
          </li> 
        </div>

      </ul>
    </nav>
  );
};

export default NavbarUser;
