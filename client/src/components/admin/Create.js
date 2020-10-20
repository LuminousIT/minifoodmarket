import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form } from './Form';
import { getCategories, addMarket } from '../../actions/market';

export const Create = ({
  getCategories,
  addMarket,
  market: { categories },
}) => {
  const history = useHistory();
  const isEdit = false;

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <div className=''>
      <Form
        title='Create'
        isEdit={isEdit}
        categories={categories}
        addMarket={addMarket}
        history={history}
      />
    </div>
  );
};

Create.propTypes = {
  getCategories: PropTypes.func.isRequired,
  addMarket: PropTypes.func.isRequired,
};

const mapStateProps = (state) => ({
  market: state.market,
});

export default connect(mapStateProps, {
  getCategories,
  addMarket,
})(Create);
