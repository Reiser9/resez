import { Permission } from '@/entities/user';

export const checkPermission = (permissions?: Permission[], permission?: string[]) => {
    if (!permissions || !permission) {
        return false;
    }

    for (let i = 0; i < permissions.length; i++) {
        if (permission.includes(permissions[i].permission)) {
            return true;
        }
    }

    return false;
};
