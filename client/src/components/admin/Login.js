import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import UseForm from '../UseForm';
import { login } from '../../actions/auth';

export const Login = ({ login, isAuthenticated }) => {
  const stateSchema = {
    email: { value: '', error: '' },
    password: { value: '', error: '' },
  };
  const validationSchema = {
    email: {
      required: true,
      validator: {
        regEx: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        error: 'Invalid Email ',
      },
    },
    password: {
      required: true,
      validator: {
        regEx: '',
        error: 'Enter Password',
      },
    },
  };
  const onSubmitForm = (state) => {
    console.log('Proceed to login');
    console.log(state);
    let formData = state;
    let data = {};
    for (const key in formData) {
      data[key] = formData[key].value;
    }
    formData = JSON.stringify(data, null, 2);
    console.log(formData);
    login(formData);
  };
  const { state, handleOnChange, handleOnSubmit, disable } = UseForm(
    null,

    stateSchema,
    validationSchema,
    onSubmitForm
  );

  //   edirect if logged in
  if (isAuthenticated) return <Redirect to='/dashboard' />;

  return (
    <div className='col-md-6 m-auto'>
      <div className='card card-body mt-5'>
        <h2 className='text-center'>Login</h2>
        <form method='post' autoComplete='off' onSubmit={handleOnSubmit}>
          <div className='form-group'>
            <label htmlFor=''>Email</label>
            <input
              type='text'
              className='form-control'
              name='email'
              id='email'
              placeholder='Email'
              value={state.email.value}
              onChange={handleOnChange}
            />
            {state.email.error && (
              <span className='text-danger'>{state.email.error}</span>
            )}
          </div>
          <div className='form-group'>
            <label htmlFor=''>Password</label>
            <input
              type='password'
              className='form-control'
              name='password'
              id='password'
              placeholder='Password'
              value={state.password.value}
              onChange={handleOnChange}
            />
            {state.password.error && (
              <span className='text-danger'>{state.password.error}</span>
            )}
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-primary'>
              {' '}
              Login
            </button>
          </div>
          <p>
            Don't have an account ? <Link to='/register'>Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateProps, { login })(Login);
