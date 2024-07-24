import React from 'react';

export const ArrowBottomRight = ({ ...props }) => {
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
            <path d="M19 13V19H13" />
            <path d="M5 5L19 19" />
        </svg>
    );
};
