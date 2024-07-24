import React from 'react';

export const ArrowTopLeft = ({ ...props }) => {
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
            <path d="M5 11V5H11" />
            <path d="M5 5L19 19" />
        </svg>
    );
};
