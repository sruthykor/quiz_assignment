import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div>
      <nav className='nav-wrapper teal'>
        <div className='container'>
          <Link to='/' className='brand-logo'>
            QuizApp
          </Link>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li>
              {' '}
              <Link to='/'>Home</Link>
            </li>
            <li>
              {' '}
              <Link to='/about'>About</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
