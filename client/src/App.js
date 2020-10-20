import React, { useEffect, Component, Fragment } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import store from './store';

import { loadAdmin } from './actions/auth';

import Header from './components/Header';
import Alerts from './components/Alerts';
import PrivateRoute from './components/PrivateRoutes';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import Create from './components/admin/Create';
import Edit from './components/admin/Edit';
import Homepage from './components/Homepage';
import Search from './components/Search';
import Details from './components/Details';

const App = () => {
  useEffect(() => {
    store.dispatch(loadAdmin());
  }, []);

  // Alert Options
  const alertOptions = {
    timeout: 3000,
    positions: positions.TOP_RIGHT,
    // transition: transitions.FADE,
  };

  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
          <Fragment>
            <Header />
            <Alerts />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Homepage} />
                <Route exact path='/details/:id' component={Details} />
                <Route exact path='/search' component={Search} />
                <Route exact path='/login' component={Login} />
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute exact path='/create' component={Create} />
                <PrivateRoute exact path='/edit/:id' component={Edit} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </AlertProvider>
    </Provider>
  );
};

export default App;
