import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counterSlice';

import userReducer from './userSlice';


const loggerMiddleware = (storeAPI) => (next) => (action) => {

  console.log('Dispatching:', action )  ;

  const result = next( action )  ;

  console.log('Updated store state:', store.getState() )  ;

  return result;
};

const store = configureStore({
    reducer: {
        counter: counterReducer,
        user : userReducer
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;
