import React from 'react';

import { AuthWrapper } from '@/shared/wrappers/AuthWrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <AuthWrapper>{children}</AuthWrapper>;
}
