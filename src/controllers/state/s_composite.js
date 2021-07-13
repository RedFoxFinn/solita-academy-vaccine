import { createSlice } from '@reduxjs/toolkit';

export const compositeSlice = createSlice({
  name: 'composite',
  initialState: {
    data: [],
    status: 'waiting'
  },
  reducers: {
    setComposite: (state, action) => {
      state.data = action.compositeData
    },
    setStatus: (state, action) => {
      state.status = action.status
    }
  }
});

export const { setComposite, setStatus } = compositeSlice.actions;

export default compositeSlice.reducer;