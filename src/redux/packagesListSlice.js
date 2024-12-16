import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  // Example initial state, replace or fetch dynamically
  { id: 1, packageName: 'Basic Package', price: 50, createdAt: '2024-12-01T10:00:00Z' },
  { id: 2, packageName: 'Standard Package', price: 100, createdAt: '2024-12-05T12:00:00Z' },
  { id: 3, packageName: 'Premium Package', price: 200, createdAt: '2024-12-10T15:00:00Z' },
];

const packagesSlice = createSlice({
  name: 'packages',
  initialState,
  reducers: {
    addPackage: (state, action) => {
      state.push(action.payload);
    },
    deletePackage: (state, action) => {
      return state.filter(pkg => pkg.id !== action.payload);
    },
    updatePackage: (state, action) => {
      const { id, updatedData } = action.payload;
      const packageIndex = state.findIndex(pkg => pkg.id === id);
      if (packageIndex !== -1) {
        state[packageIndex] = { ...state[packageIndex], ...updatedData };
      }
    },
    setPackages: (state, action) => {
      return action.payload;
    },
  },
});

export const { addPackage, deletePackage, updatePackage, setPackages } = packagesSlice.actions;

export default packagesSlice.reducer;
