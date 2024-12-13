import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'


// Simulated API call
export const fetchCountFromAPI = createAsyncThunk(
  'counter/fetchCount',
  async () => {
      const response = await new Promise((resolve) =>
          setTimeout(() => resolve(10), 500)
      );
      return response  ; 
  }
);

export const counterSlice = createSlice(
{

  name: 'counter',
  initialState: {
      value: 0,
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  },

  reducers: {
      increment: (state) => {
          state.value += 1;
      },
      decrement: (state) => {
          state.value -= 1;
      },
      incrementByAmount: (state, action) => {
          state.value += action.payload;
      },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchCountFromAPI.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchCountFromAPI.fulfilled, (state, action) => {
            state.value = action.payload;
            state.status = 'succeeded';
        })
        .addCase(fetchCountFromAPI.rejected, (state) => {
            state.status = 'failed';
        });
    },
}
);

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;