import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    { id: 1, packageName: 'Jee Mains Crash Course', price: 18000, createdAt: '2024-12-16T10:00:00Z' },
    { id: 2, packageName: 'Full Stack Web Development(MERN)', price: 40000, createdAt: '2024-12-16T12:00:00Z' },
    { id: 3, packageName: 'Java Spring Boot', price: 30000, createdAt: '2024-12-16T15:00:00Z' },
    { id: 4, packageName: 'Python Django', price: 20000, createdAt: '2024-12-16T11:00:00Z' },
    { id: 5, packageName: 'C++ ASP.NET', price: 30000, createdAt: '2024-12-16T14:00:00Z' },
    { id: 6, packageName: 'Jee Mains+Advance Crash Course', price: 27000, createdAt: '2024-12-16T13:00:00Z' },
];

const packagesSlice = createSlice({
    name: 'packages',
    initialState,
    reducers: {
        setPackages(state, action) {
            return action.payload;
        },
        addPackage(state, action) {
            state.push(action.payload);
        },
        deletePackage(state, action) {
            return state.filter(pkg => pkg.id !== action.payload); // Filter out the deleted package
        },
    },
});

export const { setPackages, addPackage, deletePackage } = packagesSlice.actions;
export default packagesSlice.reducer;
