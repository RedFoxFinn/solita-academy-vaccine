import {configureStore} from '@reduxjs/toolkit';

import vaccinationSlice from './s_vaccination';
import orderSlice from './s_order';
import compositeSlice from './s_composite';

export default configureStore({
  reducer: {
    vaccinations: vaccinationSlice,
    orders: orderSlice,
    composite: compositeSlice
  }
});