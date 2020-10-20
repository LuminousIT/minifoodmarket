import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form } from './Form';
import Spinner from '../Spinner';
import { getCategories, updateMarket, getMarket } from '../../actions/market';

export const Edit = ({
  getCategories,
  updateMarket,
  getMarket,
  market: { categories, market, loading },
}) => {
  const match = useRouteMatch();
  const history = useHistory();
  const isEdit = true;
  const id = match.params.id;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        await getMarket(id);
      };
      fetchData();
    }

    getCategories();
  }, [getMarket, getCategories]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {!loading && (
        <Fragment>
          <div className=''>
            <Form
              title='Edit'
              isEdit={isEdit}
              id={id}
              categories={categories}
              market={market}
              updateMarket={updateMarket}
              history={history}
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Edit.propTypes = {
  getCategories: PropTypes.func.isRequired,
  updateMarket: PropTypes.func.isRequired,
  getMarket: PropTypes.func.isRequired,
};

const mapStateProps = (state) => ({
  market: state.market,
});

export default connect(mapStateProps, {
  getCategories,
  updateMarket,
  getMarket,
})(Edit);
