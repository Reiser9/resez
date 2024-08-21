import { configureStore } from '@reduxjs/toolkit';

import notifySlice from './slices/notify';
import userSlice from './slices/user';
import appSlice from './slices/app';
import messengerSlice from './slices/messenger';

const store = configureStore({
    reducer: {
        notify: notifySlice,
        user: userSlice,
        app: appSlice,
        messenger: messengerSlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
