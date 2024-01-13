import { configureStore } from '@reduxjs/toolkit';

import notifySlice from './slices/notify';

const store = configureStore({
    reducer: {
        notify: notifySlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
