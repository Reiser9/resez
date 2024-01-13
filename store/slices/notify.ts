import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { LocalNotify } from '@/entities/notify/model';

type Type = {
    localNotifies: LocalNotify[];
};

const initialState: Type = {
    localNotifies: [],
};

export const notifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {
        addLocalNotify: (state, action: PayloadAction<LocalNotify>) => {
            state.localNotifies = [...state.localNotifies, action.payload];
        },
        removeLocalNotify: (state, action: PayloadAction<number>) => {
            state.localNotifies = state.localNotifies.filter((item) => item.id !== action.payload);
        },
    },
});

export const { addLocalNotify, removeLocalNotify } = notifySlice.actions;

export default notifySlice.reducer;
