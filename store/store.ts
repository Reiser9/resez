import { configureStore } from '@reduxjs/toolkit';

import notifySlice from './slices/notify';
import userSlice from './slices/user';
import appSlice from './slices/app';
import roleSlice from './slices/role';

const store = configureStore({
    reducer: {
        notify: notifySlice,
        user: userSlice,
        app: appSlice,
        role: roleSlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
