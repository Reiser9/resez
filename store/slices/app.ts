import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type AppStateType = {
    serverIsAvailable: boolean;
    appIsLoading: boolean;
};

const initialState: AppStateType = {
    serverIsAvailable: true,
    appIsLoading: true
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setServerIsAvailable: (state, action: PayloadAction<boolean>) => {
            state.serverIsAvailable = action.payload;
        },
        setAppIsLoading: (state, action: PayloadAction<boolean>) => {
            state.appIsLoading = action.payload;
        },
    },
});

export const { setServerIsAvailable, setAppIsLoading } = appSlice.actions;

export default appSlice.reducer;
