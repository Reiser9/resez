import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { User, VerificationCodeData } from '@/entities/user/model';

type UserStateType = {
    isAuth: boolean;
    user: User | null;
    verificationCodeData: VerificationCodeData | null;
    sessiodId: number | null;
};

const initialState: UserStateType = {
    isAuth: false,
    user: null,
    verificationCodeData: null,
    sessiodId: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        initUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        initVerificationCodeData: (state, action: PayloadAction<VerificationCodeData | null>) => {
            state.verificationCodeData = action.payload;
        },
        initSessionId: (state, action: PayloadAction<number | null>) => {
            state.sessiodId = action.payload;
        },
    },
});

export const { setIsAuth, initUser, initVerificationCodeData, initSessionId } = userSlice.actions;

export default userSlice.reducer;
