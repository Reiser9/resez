'use client';

import React from 'react';

import useRequest from '@/shared/hooks/useRequest';
import axios from 'axios';

const useFile = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const uploadImageOnServerByFile = async (file: FormData) => {
        const response = await request({
            url: '/education-ms/admin/upload/image',
            data: file,
            method: 'POST',
            isAuth: true,
            headers: {
                'Content-type': 'multipart/form-data',
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const uploadImageOnServerByUrl = async (url: string) => {
        const response = await request({
            url: '/education-ms/admin/upload/image-by-url',
            data: {
                url,
            },
            method: 'POST',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    // http://localhost:8084/admin/upload/file

    const uploadFile = async (file: FormData) => {
        const response = await request({
            url: '/education-ms/admin/upload/file',
            data: file,
            method: 'POST',
            isAuth: true,
            headers: {
                'Content-type': 'multipart/form-data',
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    return {
        uploadImageOnServerByFile,
        uploadImageOnServerByUrl,
        uploadFile,
    };
};

export default useFile;
