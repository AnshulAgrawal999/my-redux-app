import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counterSlice';


const loggerMiddleware = (storeAPI) => (next) => (action) => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('Next state:', storeAPI.getState());
  return result;
};

const store = configureStore({
    reducer: {
        counter: counterReducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;
