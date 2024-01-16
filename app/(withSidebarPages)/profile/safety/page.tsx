'use client';

import React from 'react';

import { ChangePassword } from './ui/ChangePassword';
import { Activity } from './ui/Activity';

const ProfileSafety = () => {
    return (
        <>
            <ChangePassword />
            <Activity />
        </>
    );
};

export default ProfileSafety;
