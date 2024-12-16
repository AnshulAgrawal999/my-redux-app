import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counterSlice';

import userReducer from './userSlice';

import packagesReducer from './packagesListSlice'


const loggerMiddleware = (storeAPI) => (next) => (action) => {

  console.log('Dispatching:', action )  ;

  const result = next( action )  ;

  console.log('Updated store state:', store.getState() )  ;

  return result;
};

const store = configureStore({
    reducer: {
        counter: counterReducer,
        user : userReducer,
        packages : packagesReducer
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;
