"use client";

import React from 'react';
import { useParams } from 'next/navigation';



const TestsSubject = () => {
    const { subject } = useParams();

    return <div>TestsSubject {subject}</div>;
};

export default TestsSubject;
