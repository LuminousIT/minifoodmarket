import React, { Fragment, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import { searchMarket } from '../actions/market';

export const Header = ({
  auth: { isAuthenticated, admin },
  logout,
  searchMarket,
}) => {
  const history = useHistory();
  const [word, setword] = useState();
  const handleChange = (e) => {
    setword(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (word === '' || word === undefined || word === null) {
      // console.log('back');
      //   // return history.push('/');
    } else {
      searchMarket(word);
      let w = word;
      setword('');
      return history.push(`/search/?q=${w}`);
    }
  };

  const authLinks = (
    <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
      <li className='nav-item'>
        <Link to='/dashboard' className='nav-link'>
          Dashboard
        </Link>
      </li>
      <span className='navbar-text mr-3'>
        <strong>{admin ? `${admin.email}` : ''}</strong>
        {/* <strong>{admin ? `Welcome ${admin.email}` : ''}</strong> */}
      </span>
      <li className='nav-item'>
        <button
          className='nav-link btn btn-primary btn-sm text-light'
          onClick={logout}
        >
          Logout
        </button>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
      {/* <li className='nav-item'>
        <Link to='/register' className='nav-link'>
          Register
        </Link>
      </li> */}
      <li className='nav-item'>
        <Link to='/login' className='nav-link'>
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <Fragment>
      <nav className='navbar navbar-expand-sm navbar-light bg-light'>
        <div className='container'>
          <a className='navbar-brand' href='#'>
            Mini Market
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarTogglerDemo02'
            aria-controls='navbarTogglerDemo02'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          {/* <div className='collapse navbar-collapse' id='navbarTogglerDemo02'>
              {isAuthenticated ? authLinks : guestLinks}
            </div> */}

          <form onSubmit={handleSearch} className='input-group mx-sm-3 '>
            <input
              type='text'
              value={word}
              onChange={handleChange}
              className='form-control'
              placeholder='Search name and categories'
            />
            <div className='input-group-btn'>
              <button className='btn btn-primary'>Search</button>
            </div>
          </form>

          {/* <div className='form-inline'>
              <div className='form-group mx-sm-3'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Search name and categories'
                />
              </div>
              <button className='btn btn-primary'>Search</button>
            </div> */}

          <ul className='nav navbar-nav navbar-right'>
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  searchMarket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout, searchMarket })(Header);
