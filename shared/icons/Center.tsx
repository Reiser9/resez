import React from 'react';

export const Center = ({ ...props }) => {
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
            <line x1="21" x2="3" y1="6" y2="6" />
            <line x1="17" x2="7" y1="12" y2="12" />
            <line x1="19" x2="5" y1="18" y2="18" />
        </svg>
    );
};
