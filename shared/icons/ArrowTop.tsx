import React from 'react';

export const ArrowTop = ({ ...props }) => {
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
            <path d="M8 6L12 2L16 6" />
            <path d="M12 2V22" />
        </svg>
    );
};
