import { describe, expect, test } from '@jest/globals';
import { checkPermission } from '../../shared/utils/checkPermissions';
import { Permission } from '../../entities/user';

describe('checkPermission', () => {
    test('should return true if all required permissions are present', () => {
        const permissions: Permission[] = [
            { id: 1, permission: 'ADMIN' },
            { id: 2, permission: 'USER' },
            { id: 3, permission: 'EDITOR' },
        ];
        const requiredPermissions = ['ADMIN', 'USER'];

        const result = checkPermission(permissions, requiredPermissions);
        expect(result).toBe(true);
    });
    test('should return false if some required permissions are missing', () => {
        const permissions: Permission[] = [
            { id: 1, permission: 'ADMIN' },
            { id: 2, permission: 'USER' },
        ];
        const requiredPermissions = ['ADMIN', 'EDITOR'];

        const result = checkPermission(permissions, requiredPermissions);
        expect(result).toBe(false);
    });
    test('should return false if none of the required permissions are present', () => {
        const permissions: Permission[] = [{ id: 1, permission: 'USER' }];
        const requiredPermissions = ['ADMIN', 'EDITOR'];

        const result = checkPermission(permissions, requiredPermissions);
        expect(result).toBe(false);
    });
    test('should return true if requiredPermissions array is empty', () => {
        const permissions: Permission[] = [{ id: 1, permission: 'ADMIN' }];
        const requiredPermissions: string[] = [];

        const result = checkPermission(permissions, requiredPermissions);
        expect(result).toBe(true);
    });
    test('should return true if permissions array is empty and requiredPermissions array is also empty', () => {
        const permissions: Permission[] = [];
        const requiredPermissions: string[] = [];

        const result = checkPermission(permissions, requiredPermissions);
        expect(result).toBe(true);
    });
    test('should return false if permissions array is empty and requiredPermissions are not empty', () => {
        const permissions: Permission[] = [];
        const requiredPermissions = ['ADMIN'];

        const result = checkPermission(permissions, requiredPermissions);
        expect(result).toBe(false);
    });
    test('should return false if requiredPermissions contains permissions that are not present in user permissions', () => {
        const permissions: Permission[] = [
            { id: 1, permission: 'USER' },
            { id: 2, permission: 'MODERATOR' },
        ];
        const requiredPermissions = ['ADMIN'];

        const result = checkPermission(permissions, requiredPermissions);
        expect(result).toBe(false);
    });
});
