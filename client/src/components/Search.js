import React, { Fragment, useEffect } from 'react';
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';

export const Search = ({ market: { markets, loading, error } }) => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  console.log(query.get('q'));
  // const match = useRouteMatch();
  // const q = match.url;
  // useEffect(() => {
  //   console.log(query.get('q'));
  // });

  // useEffect(() => {
  //   searchMarket();
  // }, [searchMarket]);

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
  const noData = (
    <div className='col-md-12'>
      {<h3>There are no results for "{query.get('q')}" </h3>}
      <h3>- Check your spelling for typing errors</h3>
      <h3>- Try searching with short and simple keywords</h3>
      <h3>
        - Try searching more general terms - you can then filter the search
        results
      </h3>
      <Link to='/' className='btn btn-primary mt-3'>
        GO TO HOMEPAGE
      </Link>
    </div>
  );

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

Search.propTypes = {
  market: PropTypes.object.isRequired,
};
const mapStateProps = (state) => ({
  market: state.market,
});

export default connect(mapStateProps, {})(Search);
