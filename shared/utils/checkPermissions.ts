import { Permission } from '@/entities/user';

export const checkPermission = (permissions: Permission[], requiredPermissions: string[]) => {
    if (!permissions.length && !!requiredPermissions.length) {
        return false;
    }

    const permissionSet = new Set(permissions.map((p) => p.permission));

    return requiredPermissions.every((permission) => permissionSet.has(permission));
};
