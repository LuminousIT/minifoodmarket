import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMarkets } from '../actions/market';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';

export const Homepage = ({
  getMarkets,
  market: { markets, loading, error },
}) => {
  useEffect(() => {
    getMarkets();
  }, [getMarkets]);

  const data = (
    <Fragment>
      <div className='row'>
        {markets.map((m) => (
          <div className='col-md-3 col-sm-4 mb-3' key={m._id}>
            <Link to={`/details/${m._id}`}>
              <div className='card'>
                <img
                  src='https://res.cloudinary.com/dvbtbsinu/image/upload/v1597681949/samples/cloudinary-group.jpg'
                  alt=''
                  className='img-thumbnail'
                />
                <div className='card-body'>
                  <h3 className='card-title'>{m.marketname}</h3>
                  <p className='card-text'>{m.marketshortdescription}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Fragment>
  );
  const noData = <div className='col-md-12'>No Data</div>;

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container mt-3'>
        {!loading && <Fragment>{markets.length > 0 ? data : noData}</Fragment>}
      </div>
    </Fragment>
  );
};

Homepage.propTypes = {
  getMarkets: PropTypes.func.isRequired,
  market: PropTypes.object.isRequired,
};
const mapStateProps = (state) => ({
  market: state.market,
});

export default connect(mapStateProps, { getMarkets })(Homepage);
