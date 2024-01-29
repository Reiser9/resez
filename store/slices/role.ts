import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Permissions } from '@/entities/role';

type RoleStateType = {
    permissions: Permissions[] | null;
};

const initialState: RoleStateType = {
    permissions: null,
};

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        initRoles: (state, action: PayloadAction<Permissions[]>) => {
            state.permissions = action.payload;
        },
        setRoleData: (state) => {
            state.permissions = null;
        },
    },
});

export const { initRoles, setRoleData } = roleSlice.actions;

export default roleSlice.reducer;
