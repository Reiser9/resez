'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { CreatePageWrapper } from '@/shared/wrappers/CreatePageWrapper';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { useTaskSource } from '@/features/task-source';
import { cyrToLat } from '@/shared/utils/cytToLat';
import useAlert from '@/shared/hooks/useAlert';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Preloader } from '@/shared/ui/Preloader';

const AdminEditSource = () => {
    const { id } = useParams();

    const [source, setSource] = React.useState('');
    const [slug, setSlug] = React.useState('');

    const { updateSource,  } = useTaskSource();
    const { alertNotify } = useAlert();
    const router = useRouter();

    // const {
    //     data,
    //     isLoading: roleIsLoading,
    //     isError,
    // } = useQuery({
    //     queryKey: ['source_by_id', id],
    //     queryFn: () => getCurrentRole(String(id)),
    //     enabled: !!id,
    // });

    const editSourceMutation = useMutation({
        mutationFn: async () => {
            if(!source){
                return alertNotify("Предупреждение", "Источник не может быть пустым", "warn");
            }

            if(!slug){
                return alertNotify("Предупреждение", "Ярлык источника не может быть пустым", "warn");
            }

            updateSource(String(id), source, slug, () => router.replace("/admin/sources"));
        },
    });

    const cyrToLatName = () => {
        if (!slug) {
            setSlug(cyrToLat(source));
        }
    };

    // if(){
    //     return <Preloader page />
    // }

    return (
        <PrivateWrapper permissions={[PERMISSIONS.TASKS]}>
            <CreatePageWrapper
                title={`${id}`}
                button={
                    <Button
                        auto
                        onClick={() => editSourceMutation.mutate()}
                        loading={editSourceMutation.isPending}
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

export default AdminEditSource;
