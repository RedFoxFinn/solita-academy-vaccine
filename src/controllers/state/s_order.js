import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    data: [],
    status: 'waiting'
  },
  reducers: {
    setOrders: (state, action) => {
      state.data = action.orders
    },
    setStatus: (state, action) => {
      state.status = action.status
    }
  }
});

export const { setOrders, setStatus } = orderSlice.actions;

export default orderSlice.reducer;