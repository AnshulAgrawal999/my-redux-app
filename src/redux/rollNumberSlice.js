import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'  ;

// Simulated API call
export const fetchStudentsFromAPI = createAsyncThunk(
  'fetchStudents',
  async () => {
      return new Promise((resolve) => {
          setTimeout(() => {
              // Replace with sample API response
              resolve([
                  { id: 1, createdAt: '2024-12-18T10:00:00Z' },
              ]);
          }, 500);
      });
  }
);


// Redux slice for managing roll numbers
export const rollNumberSlice = createSlice(
{
    name: "rollNumbers",
    initialState: {
      rollNumbers: [],
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null, // To store error message
    },
    reducers: {
      addRollNumber: (state, action) => {
        state.rollNumbers.push(action.payload);
      },
      resetRollNumbers: (state) => {
        state.rollNumbers = [];
      },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPackagesFromAPI.pending, (state) => {
                state.status = 'loading'; // Set loading state while fetching
            })
            .addCase(fetchPackagesFromAPI.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Set to succeeded when data is fetched
            })
            .addCase(fetchPackagesFromAPI.rejected, (state, action) => {
                state.status = 'failed'; // Set to failed when there's an error
                state.error = action.error.message; // Set the error message
            });
    },
});

  
export const { addRollNumber, resetRollNumbers } = rollNumberSlice.actions  ;


export default rollNumberSlice.reducer;
