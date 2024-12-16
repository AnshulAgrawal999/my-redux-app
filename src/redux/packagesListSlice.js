import { createSlice } from '@reduxjs/toolkit'  ;

const initialState = []  ;

const packagesSlice = createSlice({
  name: 'packages',
  initialState,
  reducers: {

    addPackage: (state, action) => {
      state.push(action.payload)  ;
    },

    deletePackage: (state, action) => {
      return state.filter(pkg => pkg.id !== action.payload)  ;
    },

    updatePackage: (state, action) => {

      const { id, updatedData } = action.payload  ;
      const packageIndex = state.findIndex(pkg => pkg.id === id)  ;
      if (packageIndex !== -1) {
        state[packageIndex] = { ...state[packageIndex], ...updatedData }  ;
      }

    },

    setPackages: (state, action) => {
      return action.payload;
    },

  },
});

export const { addPackage, deletePackage, updatePackage, setPackages } = packagesSlice.actions  ; 

export default packagesSlice.reducer  ;
