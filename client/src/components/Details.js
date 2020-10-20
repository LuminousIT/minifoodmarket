import React, { Fragment, useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMarket } from '../actions/market';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';

export const Details = ({ getMarket, market: { market, loading, error } }) => {
  const match = useRouteMatch();

  useEffect(() => {
    const fetchData = async () => {
      await getMarket(match.params.id);
    };
    fetchData();
  }, []);

  const data = (
    <Fragment>
      <div className='d-flex flex-row mb-3'>
        <div>
          <Link to='/' className='btn btn-primary mr-3'>
            Go Back
          </Link>
        </div>
        <div className=''>
          <h3>{market !== null ? `${market.marketname} Details` : ''}</h3>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <div className='card'>
            <img
              src='https://res.cloudinary.com/dvbtbsinu/image/upload/v1597681949/samples/cloudinary-group.jpg'
              alt=''
              className='img-thumbnail'
            />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <h3 className='card-title'>
                {market !== null ? `Name: ${market.marketname}` : ''}
              </h3>

              <p className='card-text'>
                {market !== null
                  ? `Category: ${market.marketcategory.categoryname}`
                  : ''}
              </p>
              <p className='card-text'>
                {market !== null ? `${market.marketshortdescription}` : ''}
              </p>
              <p className='card-text'>
                {market !== null ? market.marketdescription : ''}
              </p>
            </div>
          </div>
        </div>

        <div className='col-md-12 mt-3'>
          <div className='card'>
            <div className='card-body'>
              <h3 className='card-title'>Location</h3>
              <p className='card-text'>
                {market !== null
                  ? `Country : ${market.marketaddress.country}`
                  : ''}
              </p>
              <p className='card-text'>
                {market !== null
                  ? `City : ${market.marketaddress.location}`
                  : ''}
              </p>
              <p className='card-text'>
                {market !== null
                  ? `Longitude : ${market.marketaddress.lng}`
                  : ''}
              </p>
              <p className='card-text'>
                {market !== null
                  ? `Latitude : ${market.marketaddress.lat}`
                  : ''}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );

  const noData = <div className='col-md-12'>No Data</div>;

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container mt-3'>
        {!loading && <Fragment>{market !== null ? data : noData}</Fragment>}
      </div>
    </Fragment>
  );
};

Details.propTypes = {
  getMarket: PropTypes.func.isRequired,
  market: PropTypes.object.isRequired,
};
const mapStateProps = (state) => ({
  market: state.market,
});

export default connect(mapStateProps, { getMarket })(Details);
