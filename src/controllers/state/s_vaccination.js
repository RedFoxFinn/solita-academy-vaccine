import { createSlice } from '@reduxjs/toolkit';

export const vaccinationSlice = createSlice({
  name: 'vaccinations',
  initialState: {
    data: [],
    status: 'waiting'
  },
  reducers: {
    setVaccinations: (state, action) => {
      state.data = action.vaccinations
    },
    setStatus: (state, action) => {
      state.status = action.status
    }
  }
});

export const { setVaccinations, setStatus } = vaccinationSlice.actions;

export default vaccinationSlice.reducer;