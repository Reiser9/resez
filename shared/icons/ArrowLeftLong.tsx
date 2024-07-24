import React from 'react';

export const ArrowLeftLong = ({ ...props }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M6 8L2 12L6 16" />
            <path d="M2 12H22" />
        </svg>
    );
};
