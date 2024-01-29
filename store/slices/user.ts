import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ProfileInfo, Settings, User, VerificationCodeData } from '@/entities/user';

type UserStateType = {
    isAuth: boolean;
    user: User | null;
    profileInfo: ProfileInfo | null;
    verificationCodeData: VerificationCodeData | null;
    sessionId: number | null;
};

const initialState: UserStateType = {
    isAuth: false,
    user: null,
    profileInfo: null,
    verificationCodeData: null,
    sessionId: null,
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
        initProfileInfo: (state, action: PayloadAction<ProfileInfo | null>) => {
            state.profileInfo = action.payload;
        },
        initVerificationCodeData: (state, action: PayloadAction<VerificationCodeData | null>) => {
            state.verificationCodeData = action.payload;
        },
        initSessionId: (state, action: PayloadAction<number | null>) => {
            state.sessionId = action.payload;
        },
        setUserSettings: (state, action: PayloadAction<Settings>) => {
            if (state.user) {
                state.user.settings = { ...state.user.settings, ...action.payload };
            }
        },
        setUserBlocked: (state, action: PayloadAction<boolean>) => {
            if (state.user) {
                state.user.isBlocked = action.payload;
            }
        },
        setUserBlockReason: (state, action: PayloadAction<string | null>) => {
            if (state.user) {
                state.user.blockReason = action.payload;
            }
        },
        setUserData: (state) => {
            state.isAuth = false;
            state.user = null;
            state.profileInfo = null;
            state.verificationCodeData = null;
            state.sessionId = null;
        },
    },
});

export const {
    setIsAuth,
    initUser,
    initProfileInfo,
    initVerificationCodeData,
    initSessionId,
    setUserSettings,
    setUserBlocked,
    setUserBlockReason,
    setUserData,
} = userSlice.actions;

export default userSlice.reducer;
