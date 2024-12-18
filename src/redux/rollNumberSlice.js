import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'  ;

// Simulated API call
export const fetchStudentsFromAPI = createAsyncThunk(
  'fetchPackages',
  async () => {
      return new Promise((resolve) => {
          setTimeout(() => {
              // Replace with sample API response
              resolve([
                  { id: 1, createdAt: '2024-12-16T10:00:00Z' },
              ]);
          }, 500);
      });
  }
);


// Redux slice for managing roll numbers
const rollNumberSlice = createSlice({
    name: "rollNumbers",
    initialState: {
      rollNumbers: [],
    },
    reducers: {
      addRollNumber: (state, action) => {
        state.rollNumbers.push(action.payload);
      },
      resetRollNumbers: (state) => {
        state.rollNumbers = [];
      },
    },
  });
  
  const { addRollNumber, resetRollNumbers } = rollNumberSlice.actions;
  const store = configureStore({
    reducer: {
      rollNumbers: rollNumberSlice.reducer,
    },
  });