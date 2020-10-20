import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMarkets, deleteMarket } from '../../actions/market';
import Spinner from '../Spinner';
import { Modal, Button } from 'react-bootstrap';

export const Dashboard = ({
  getMarkets,
  deleteMarket,
  market: { markets, loading, error },
}) => {
  useEffect(() => {
    getMarkets();
  }, [getMarkets]);

  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setName('');
    setId('');
    setShowModal(false);
  };
  const handleShow = (name, id) => {
    setId(id);
    setName(name);
    setShowModal(true);
  };
  const [name, setName] = useState('');
  const [id, setId] = useState();

  const confirmDelete = () => {
    deleteMarket(id);
    handleClose();
  };

  const handleEditPage = (id) => {
    history.push(`/edit/${id}`);
  };

  let n = 1;
  const data = (
    <Fragment>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete {name} ?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close{' '}
          </Button>
          <Button variant='danger' onClick={() => confirmDelete()}>
            Delete{' '}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='col-md-12'>
        <div className='table-responsive'>
          <table className='table table-striped table-bordered table-hover'>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Category</th>
                <th>Short Description</th>
                <th>Country</th>
                <th>City</th>
                <th>Longitude</th>
                <th>Latitude</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {markets.map((m) => (
                <tr key={m._id}>
                  <td>{n++}</td>
                  <td>{m.marketname}</td>
                  <td>{m.marketcategory.categoryname}</td>
                  <td>{m.marketshortdescription}</td>
                  <td>{m.marketaddress.country}</td>
                  <td>{m.marketaddress.location}</td>
                  <td>{m.marketaddress.lng}</td>
                  <td>{m.marketaddress.lat}</td>
                  <td>
                    <button
                      className='btn btn-primary mr-2'
                      onClick={() => handleEditPage(m._id)}
                    >
                      Edit
                    </button>
                    <button
                      className='btn btn-danger'
                      onClick={() => handleShow(m.marketname, m._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
  const noData = (
    <div className='col-md-12'>
      <h2>No Data</h2>
      <Link to='/create' className='btn btn-primary mr-2'>
        Add Market
      </Link>
    </div>
  );
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='mt-3 mb-3'>
        <Link to='/create' className='btn btn-primary'>
          Create Market
        </Link>
      </div>
      {!loading && <Fragment>{markets.length > 0 ? data : noData}</Fragment>}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getMarkets: PropTypes.func.isRequired,
  deleteMarket: PropTypes.func.isRequired,
  market: PropTypes.object.isRequired,
};

const mapStateProps = (state) => ({
  market: state.market,
});

export default connect(mapStateProps, { getMarkets, deleteMarket })(Dashboard);
