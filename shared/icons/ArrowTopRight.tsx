import React from 'react';

export const ArrowTopRight = ({ ...props }) => {
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
            <path d="M13 5H19V11" />
            <path d="M19 5L5 19" />
        </svg>
    );
};
