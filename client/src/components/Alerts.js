import React, { useEffect, useState, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const Alerts = ({ error, message, alert }) => {
  // console.log('Alert errror State');
  // console.log(error);
  // console.log('Alert message State');
  // console.log(message);

  const [getError, setError] = useState();

  useEffect((prevProps) => {
    // console.log(error);
    // if (error !== prevProps.error) {
    // }
    // if (message !== prevProps.message) {
    // }
    alertSetup();
  }, []);

  const alertSetup = () => {
    // console.log('The Seutp');
  };

  return <Fragment />;
};

Alerts.propTypes = {
  error: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
