import React from 'react';
import { Provider } from 'react-redux';

import Router from './app/src/router/Router';
import { store } from './app/src/redux/Store';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
