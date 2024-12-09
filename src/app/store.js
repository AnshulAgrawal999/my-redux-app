import { configureStore } from '@reduxjs/toolkit'  ;

import counterReducer from '../features/counter/counter'  ;

export default configureStore({
  reducer: {
    counter: counterReducer
  }
})