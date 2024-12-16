import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated API call
export const fetchPackagesFromAPI = createAsyncThunk(
  'packages/fetchPackages',
  async () => {
      return new Promise((resolve) => {
          setTimeout(() => {
              // Replace with actual API response
              resolve([
                  { id: 1, packageName: 'Jee Mains Crash Course', price: 18000, createdAt: '2024-12-16T10:00:00Z' },
                  { id: 2, packageName: 'Full Stack Web Development(MERN)', price: 40000, createdAt: '2024-12-16T12:00:00Z' },
                  { id: 3, packageName: 'Java Spring Boot', price: 30000, createdAt: '2024-12-16T15:00:00Z' },
                  { id: 4, packageName: 'Python Django', price: 20000, createdAt: '2024-12-16T11:00:00Z' },
                  { id: 5, packageName: 'C++ ASP.NET', price: 30000, createdAt: '2024-12-16T14:00:00Z' },
                  { id: 6, packageName: 'Jee Mains+Advance Crash Course', price: 27000, createdAt: '2024-12-16T13:00:00Z' },
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
        updatePackage(state, action) {
            const { id, field, value } = action.payload;
            const packageToUpdate = state.packages.find(pkg => pkg.id === id);
            if (packageToUpdate) {
                packageToUpdate[field] = value; // Update the package field with the new value
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
