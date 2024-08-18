import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type AppStateType = {
    dialogsScrollPosition: number;
    currentDialogId: string | null;
};

const initialState: AppStateType = {
    dialogsScrollPosition: 0,
    currentDialogId: null,
};

export const messengerSlice = createSlice({
    name: 'messenger',
    initialState,
    reducers: {
        setDialogsScrollPosition: (state, action: PayloadAction<number>) => {
            state.dialogsScrollPosition = action.payload;
        },
        setCurrentDialogId: (state, action: PayloadAction<string | null>) => {
            state.currentDialogId = action.payload;
        },
    },
});

export const { setDialogsScrollPosition, setCurrentDialogId } = messengerSlice.actions;

export default messengerSlice.reducer;
