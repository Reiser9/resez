import { configureStore } from '@reduxjs/toolkit';

import notifySlice from './slices/notify';
import userSlice from './slices/user';

const store = configureStore({
    reducer: {
        notify: notifySlice,
        user: userSlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
