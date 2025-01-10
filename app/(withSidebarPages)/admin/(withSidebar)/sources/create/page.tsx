'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { CreatePageWrapper } from '@/shared/wrappers/CreatePageWrapper';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { useTaskSource } from '@/features/task-source';
import { cyrToLat } from '@/shared/utils/cytToLat';
import useAlert from '@/shared/hooks/useAlert';

import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';

const AdminCreateSource = () => {
    const [source, setSource] = React.useState('');
    const [slug, setSlug] = React.useState('');

    const { createSource } = useTaskSource();
    const { alertNotify } = useAlert();
    const router = useRouter();

    const createSourceMutation = useMutation({
        mutationFn: async () => {
            if (!source) {
                return alertNotify('Предупреждение', 'Источник не может быть пустым', 'warn');
            }

            if (!slug) {
                return alertNotify('Предупреждение', 'Ярлык источника не может быть пустым', 'warn');
            }

            createSource(source, slug, () => router.replace('/admin/sources'));
        },
    });

    const cyrToLatName = () => {
        if (!slug) {
            setSlug(cyrToLat(source));
        }
    };

    return (
        <PrivateWrapper permissions={[PERMISSIONS.TASKS]}>
            <CreatePageWrapper
                title="Создание источника"
                button={
                    <Button
                        auto
                        onClick={() => createSourceMutation.mutate()}
                        loading={createSourceMutation.isPending}
                        levitation
                    >
                        Создать
                    </Button>
                }
            >
                <div className={base.form}>
                    <Input
                        value={source}
                        setValue={setSource}
                        title="Источник"
                        placeholder="Например: ФИПИ"
                        trackLength
                        lengthLimit={30}
                        onBlur={cyrToLatName}
                    />

                    <Input
                        value={slug}
                        setValue={setSlug}
                        title="Ярлык источника"
                        infoText="Генерируется автоматически"
                        trackLength
                        lengthLimit={30}
                    />
                </div>
            </CreatePageWrapper>
        </PrivateWrapper>
    );
};

export default AdminCreateSource;
