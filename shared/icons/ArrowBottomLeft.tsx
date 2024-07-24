import React from 'react';

export const ArrowBottomLeft = ({ ...props }) => {
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
            <path d="M11 19H5V13" />
            <path d="M19 5L5 19" />
        </svg>
    );
};
