import React, { useState, useEffect, useCallback } from 'react';

import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const UseForm = (
  reSetAddress,
  stateSchema,
  validationSchema = {},
  callback
) => {
  const [state, setState] = useState(stateSchema);
  const [disable, setDisable] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setDisable(true);
  }, []);

  useEffect(() => {
    if (isDirty) {
      setDisable(validateState());
    }
  }, [state, isDirty]);

  const validateState = useCallback(() => {
    const hasErrorInState = Object.keys(validationSchema).some((key) => {
      const isInputFieldRequired = validationSchema[key].required;
      const stateValue = state[key].value;
      const stateError = state[key].error;

      return (isInputFieldRequired && !stateValue) || stateError;
    });
    return hasErrorInState;
  }, [state, validationSchema]);

  const handleOnChange = useCallback(
    (event) => {
      setIsDirty(true);

      const name = event.target.name;
      const value = event.target.value;

      let error = '';
      if (validationSchema[name].required) {
        if (!value) {
          error = 'Required Field';
        }
      }

      if (validationSchema[name].min) {
        if (value.length < validationSchema[name].min) {
          error = 'Min of ' + validationSchema[name].min;
        }
      }

      if (
        validationSchema[name].validator !== null &&
        typeof validationSchema[name].validator === 'object'
      ) {
        if (
          value &&
          validationSchema[name].validator.regEx &&
          !validationSchema[name].validator.regEx.test(value)
        ) {
          error = validationSchema[name].validator.error;
        }
      }

      setState((prevState) => ({
        ...prevState,
        [name]: { value, error },
      }));
    },
    [validationSchema]
  );

  const handleOnSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (!validateState()) {
        callback(state);
      }
    },
    [state]
  );

  const handleSelectCountry = useCallback(
    (value) => {
      const place = async () => {
        const result = await geocodeByAddress(value);
        const latlng = await getLatLng(result[0]);

        reSetAddress(value);

        setState((prevState) => ({
          ...prevState,
          lat: { value: latlng.lat, error: '' },
          lng: { value: latlng.lng, error: '' },
          location: { value: result[0].formatted_address, error: '' },
          country: { value: result[0].formatted_address, error: '' },
        }));
      };
      place();
    },
    [state]
  );

  const handleChangeCountry = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      lat: { value: '', error: '' },
      lng: { value: '', error: '' },
      location: { value: '', error: '' },
      country: { value: '', error: '' },
    }));
  }, [state]);

  const updateMarketSchema = useCallback(
    (data) => {
      setState((prevState) => ({
        ...prevState,
        lat: { value: data.marketaddress.lat, error: '' },
        lng: { value: data.marketaddress.lng, error: '' },
        location: { value: data.marketaddress.location, error: '' },
        country: { value: data.marketaddress.country, error: '' },
        marketname: { value: data.marketname, error: '' },
        marketcategory: { value: data.marketcategory, error: '' },
        marketdescription: { value: data.marketdescription, error: '' },
        marketshortdescription: {
          value: data.marketshortdescription,
          error: '',
        },
      }));
    },
    [state]
  );

  return {
    state,
    disable,
    handleOnChange,
    handleOnSubmit,
    handleSelectCountry,
    handleChangeCountry,
    updateMarketSchema,
  };
};
export default UseForm;
