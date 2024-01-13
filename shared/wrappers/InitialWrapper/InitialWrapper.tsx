"use client";

import React from 'react';

import useSocket from '@/shared/hooks/useSocket';

const InitialWrapper = ({ children }: { children: React.ReactNode }) => {
    useSocket();

    return children;
};

export default InitialWrapper;
