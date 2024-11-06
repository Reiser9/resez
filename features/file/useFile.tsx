'use client';

import useRequest from '@/shared/hooks/useRequest';

const useFile = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const uploadImageOnServerByUrl = async (url: string) => {
        const response = await request({
            url: '/api/upload/image-by-url',
            data: {
                url,
            },
            method: 'POST',
            isAuth: true,
            baseURL: process.env.NEXT_PUBLIC_FILE_URL,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const uploadFile = async (file: FormData) => {
        const response = await request<{ file: { url: string }; success: number }>({
            url: '/api/upload',
            data: file,
            method: 'POST',
            isAuth: true,
            headers: {
                'Content-type': 'multipart/form-data',
            },
            baseURL: process.env.NEXT_PUBLIC_FILE_URL,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    return {
        uploadImageOnServerByUrl,
        uploadFile,
    };
};

export default useFile;
