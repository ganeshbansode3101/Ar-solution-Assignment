

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ToastNotification.css';

const Navbar = () => {
    const [activeLink, setActiveLink] = useState('');

    const handleClick = (link) => {
        setActiveLink(link);
    };

    return (
        <header className="Header_header__HXQOm">
            <a className="Header_logo__container" href="/">
                <span className="Header_logo">Header</span>
            </a>
            <nav>
                <ul className="Header_nav__list">
                    <li className="Header_nav__item">
                        <Link
                            to="/component-1"
                            className={`Header_link${activeLink === '/component-1' ? ' Header_active' : ''}`}
                            onClick={() => handleClick('/component-1')}
                        >
                            First Component
                        </Link>
                    </li>
                    <li className="Header_nav__item">
                        
                        <Link
                            to="/component-2"
                            className={`Header_link${activeLink === '/component-2' ? ' Header_active' : ''}`}
                            onClick={() => handleClick('/component-2')}
                        >
                            Second Component
                        </Link>
                    </li>
                    <li className="Header_nav__item">
                       
                        <Link
                            to="/component-3"
                            className={`Header_link${activeLink === '/component-3' ? ' Header_active' : ''}`}
                            onClick={() => handleClick('/component-3')}
                        >
                            Third Component
                        </Link>
                    </li>
                </ul>
            </nav>
        </header >
    );
};

export default Navbar;
