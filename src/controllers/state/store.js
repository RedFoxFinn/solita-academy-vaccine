import {configureStore} from '@reduxjs/toolkit';

import vaccinationSlice from './s_vaccination';
import orderSlice from './s_order';

export default configureStore({
  reducer: {
    vaccinations: vaccinationSlice,
    orders: orderSlice
  }
});