import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'  ;

// Simulated API call
export const fetchPackagesFromAPI = createAsyncThunk(
  'fetchPackages',
  async () => {
      return new Promise((resolve) => {
          setTimeout(() => {
              // Replace with actual API response
              resolve([
                  { id: 1, packageName: 'Jee Mains Course', price: 25000, createdAt: '2024-12-16T10:00:00Z' },
                  { id: 2, packageName: 'Full Stack Web Development(MERN)', price: 30000, createdAt: '2024-12-16T12:00:00Z' },
                  { id: 3, packageName: 'Java Spring Boot', price: 20000, createdAt: '2024-12-16T15:00:00Z' },
                  { id: 4, packageName: 'Python Django', price: 18000, createdAt: '2024-12-16T11:00:00Z' },
                  { id: 5, packageName: 'C++ ASP.NET', price: 22000, createdAt: '2024-12-16T14:00:00Z' },
                  { id: 6, packageName: 'Jee Mains+Advanced Course', price: 35000, createdAt: '2024-12-16T13:00:00Z' },
              ]);
          }, 500);
      });
  }
);

const packagesSlice = createSlice({
    name: 'packages',
    initialState: {
        packages: [], // Store packages here
        status: 'idle', // To track loading status
        error: null, // To store error message
    },
    reducers: {
        setPackages(state, action) {
            state.packages = action.payload;
        },
        addPackage(state, action) {
            state.packages.push(action.payload);
        },
        deletePackage(state, action) {
            state.packages = state.packages.filter(pkg => pkg.id !== action.payload);
        },
       
        updatePackage: (state, action) => {
          const { id, packageName, price } = action.payload;
          const index = state.packages.findIndex(pkg => pkg.id === id);
          if (index !== -1) {
            // Mutate the package directly in the state
            state.packages[index] = {
              ...state.packages[index],
              packageName,
              price,
            };
          }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPackagesFromAPI.pending, (state) => {
                state.status = 'loading'; // Set loading state while fetching
            })
            .addCase(fetchPackagesFromAPI.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Set to succeeded when data is fetched
                state.packages = action.payload; // Set the fetched data
            })
            .addCase(fetchPackagesFromAPI.rejected, (state, action) => {
                state.status = 'failed'; // Set to failed when there's an error
                state.error = action.error.message; // Set the error message
            });
    },
});

export const { setPackages, addPackage, deletePackage, updatePackage } = packagesSlice.actions;
export default packagesSlice.reducer;
