import React from 'react';
import Logo from '../1_MediaAssets/Images/BrandAssets/Logo.png'
import { NavLink } from 'react-router-dom';

const Error = () => {

    return (
            <div style={{ backgroundColor: '#b6fae1', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', flexDirection: 'column'}}>
                <img src={Logo} alt='logo' style={{height: '100px'}} />
                <h1 style={{padding: '0', margin: '20px', fontWeight: '900'}}>404 Page not found</h1>
                <NavLink to="/">
                    <button style={{width: '150px', padding: '10px 0px'}}>Home</button>
                </NavLink>
            </div>
        )
}

export default Error