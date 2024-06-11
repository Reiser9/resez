<<<<<<< HEAD
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const AdminArchive = () => {
    const router = useRouter();

    React.useEffect(() => {
        router.push('/admin/archive/subjects');
    }, []);
};

export default AdminArchive;
=======
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const AdminArchive = () => {
    const router = useRouter();

    React.useEffect(() => {
        router.push('/admin/archive/subjects');
    }, []);
};

export default AdminArchive;
>>>>>>> c61da454dd30e7ca31637fe711cf5e35c92c2018
