import type { Key } from 'react';
import type { Paggination } from '../pagination';

export type Roles = Paggination & {
    roles: RoleDTO[];
};

export type RoleDTO = {
    id: number;
    role: string;
    textColor: string;
    backgroundColor: string;
    permissionsCount: number;
    usersCount: number;
};

export type RolesByUserId = Paggination & {
    roles: (RoleDTO & {
        isAssigned: boolean;
    })[];
};

export type Role = {
    id: number;
    role: string;
    textColor: string;
    backgroundColor: string;
};

export type RoleCreateDTO = {
    role: string;
    permissions: Key[];
    textColor: string;
    backgroundColor: string;
};

type Permission = {
    id: number;
    permission: string;
    isActive: boolean;
};

export type EditRoleDTO = {
    id: number;
    role: string;
    textColor: string;
    backgroundColor: string;
    permissions: Permission[];
};

export type Permissions = {
    id: number;
    permission: string;
    childrens: Permissions[];
};
