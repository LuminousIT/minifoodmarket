import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import UseForm from '../../components/UseForm';
import PlacesAutocomplete from 'react-places-autocomplete';

export const Form = ({
  title,
  isEdit,
  id,
  categories,
  market,
  addMarket,
  updateMarket,
  history,
}) => {
  const stateSchema = {
    marketname: { value: '', error: '' },
    marketcategory: { value: '', error: '' },
    isAvailable: { value: '', error: '' },
    marketshortdescription: { value: '', error: '' },
    marketdescription: { value: '', error: '' },
    lat: { value: '', error: '' },
    lng: { value: '', error: '' },
    location: { value: '', error: '' },
    country: { value: '', error: '' },
  };

  const validationSchema = {
    marketname: {
      required: true,
      validator: {
        regEx: '',
        error: 'Enter Market Name',
      },
    },
    marketcategory: {
      required: true,
      validator: {
        regEx: '',
        error: 'Enter Market Category',
      },
    },
    isAvailable: {
      required: true,
      validator: {
        regEx: '',
        error: 'Enter Market isAvailable',
      },
    },
    marketshortdescription: {
      required: true,
      validator: {
        regEx: '',
        error: 'Enter Market Short Description',
      },
    },
    marketdescription: {
      required: true,
      validator: {
        regEx: '',
        error: 'Enter Market Description',
      },
    },
    lat: {
      required: true,
      validator: {
        regEx: '',
        error: 'Enter Market Description',
      },
    },
    lng: {
      required: true,
      validator: {
        regEx: '',
        error: 'Enter Market Description',
      },
    },
  };

  const onSubmitForm = (state) => {
    let formData = state;
    let data = {};
    for (const key in formData) {
      data[key] = formData[key].value;
    }
    data['marketaddress'] = {
      lat: data['lat'],
      lng: data['lng'],
      location: data['location'],
      country: data['country'],
    };
    delete data['lat'];
    delete data['lng'];
    delete data['location'];
    delete data['country'];
    formData = data;
    console.log(formData);
    if (isEdit) {
      console.log('Update data');
      console.log(formData);
      updateMarket(id, formData);
      history.push('/dashboard');
    } else {
      addMarket(formData);
      history.push('/dashboard');
    }
  };

  const reSetAddress = (value) => setAddress(value);

  const {
    state,
    handleOnChange,
    handleOnSubmit,
    disable,
    handleSelectCountry,
    handleChangeCountry,
    updateMarketSchema,
  } = UseForm(reSetAddress, stateSchema, validationSchema, onSubmitForm);

  useEffect(() => {
    if (isEdit && market) {
      updateMarketSchema(market);
    }
  }, [market]);

  const [address, setAddress] = useState('');

  return (
    <div className='card card-body mt-4 mb-4'>
      <div className='d-flex flex-row mb-3'>
        <div>
          <Link to='/dashboard' className='btn btn-primary mr-3'>
            Go Back
          </Link>
        </div>
        <h2> {title} Market</h2>
      </div>

      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelectCountry}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <form method='post' autoComplete='off' onSubmit={handleOnSubmit}>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor=''>Name</label>
                  <input
                    type='text'
                    name='marketname'
                    id='marketname'
                    placeholder='Market Name'
                    className='form-control'
                    value={state.marketname.value}
                    onChange={handleOnChange}
                  />
                  {state.marketname.error && (
                    <span className='text-danger'>
                      {state.marketname.error}
                    </span>
                  )}
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor=''>Category</label>

                  <select
                    name='marketcategory'
                    id='marketcategory'
                    className='form-control'
                    onChange={handleOnChange}
                  >
                    <option value=''>Select Category</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.categoryname}
                      </option>
                    ))}
                  </select>
                  {state.marketcategory.error && (
                    <span className='text-danger'>
                      {state.marketcategory.error}
                    </span>
                  )}
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor=''>Is Available</label>

                  <select
                    name='isAvailable'
                    id='isAvailable'
                    className='form-control'
                    onChange={handleOnChange}
                  >
                    <option value=''>Select Is Available</option>
                    <option value='true'>True</option>
                    <option value='false'>False</option>
                  </select>
                  {state.isAvailable.error && (
                    <span className='text-danger'>
                      {state.isAvailable.error}
                    </span>
                  )}
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor=''>Location</label>
                  <input
                    onChange={handleChangeCountry}
                    value={state.location.value}
                    {...getInputProps({
                      placeholder: 'Search Places....',
                      className: 'location-search-input form-control',
                    })}
                  />
                  <div className='autocomplete-dropdown-container'>
                    {loading ? <div>loading......</div> : null}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? 'suggestion-item-active'
                        : 'suggestion-item';
                      const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                          key={suggestion.placeId}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label htmlFor=''>Country</label>
                  <input
                    type='text'
                    name='country'
                    id='country'
                    className='form-control'
                    disabled
                    value={state.country.value}
                    onChange={handleOnChange}
                  />
                  {state.country.error && <span>{state.countryt.error}</span>}
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label htmlFor=''>Latitude</label>
                  <input
                    type='text'
                    name='lat'
                    id='lat'
                    className='form-control'
                    disabled
                    value={state.lat.value}
                    onChange={handleOnChange}
                  />
                  {state.lat.error && <span>{state.lat.error}</span>}
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label htmlFor=''>Longititude</label>
                  <input
                    type='text'
                    name='lng'
                    id='lng'
                    className='form-control'
                    disabled
                    value={state.lng.value}
                    onChange={handleOnChange}
                  />
                  {state.lng.error && <span>{state.lng.error}</span>}
                </div>
              </div>

              <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor=''>Short Description</label>
                  <textarea
                    name='marketshortdescription'
                    id='marketshortdescription'
                    cols='30'
                    rows='10'
                    className='form-control'
                    placeholder='Short Description'
                    value={state.marketshortdescription.value}
                    onChange={handleOnChange}
                  ></textarea>
                  {state.marketshortdescription.error && (
                    <span>{state.marketshortdescription.error}</span>
                  )}
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor=''>Long Description</label>
                  <textarea
                    name='marketdescription'
                    id='marketdescription'
                    cols='30'
                    rows='10'
                    className='form-control'
                    placeholder='Long Description'
                    value={state.marketdescription.value}
                    onChange={handleOnChange}
                  ></textarea>
                  {state.marketdescription.error && (
                    <span>{state.marketdescription.error}</span>
                  )}
                </div>
              </div>
            </div>
            <div className='form-group'>
              <button type='submit' className='btn btn-primary'>
                {isEdit ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default Form;
