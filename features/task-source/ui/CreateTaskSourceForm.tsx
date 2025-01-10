'use client';

import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';

import useTaskSource from '../useTaskSource';
import useAlert from '@/shared/hooks/useAlert';
import { cyrToLat } from '@/shared/utils/cytToLat';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';

const CreateTaskSourceForm = () => {
    const [source, setSource] = React.useState('');
    const [slug, setSlug] = React.useState('');

    const { createSource } = useTaskSource();
    const { alertNotify } = useAlert();

    const queryClient = useQueryClient();

    const revalidateSources = () => {
        queryClient.invalidateQueries({ queryKey: ['sources'] });
    };

    const createSourceMutation = useMutation({
        mutationFn: async () => {
            if (!source) {
                return alertNotify('Предупреждение', 'Источник не может быть пустым', 'warn');
            }

            if (!slug) {
                return alertNotify('Предупреждение', 'Ярлык источника не может быть пустым', 'warn');
            }

            createSource(source, slug, () => {
                setSource('');
                setSlug('');
                revalidateSources();
            });
        },
    });

    const cyrToLatName = () => {
        if (!slug) {
            setSlug(cyrToLat(source));
        }
    };

    return (
        <div className={styles.createSourceSelectForm}>
            <Input
                value={source}
                setValue={setSource}
                title="Источник"
                color="white"
                placeholder="Например: ФИПИ"
                trackLength
                lengthLimit={30}
                onBlur={cyrToLatName}
            />

            <Input
                value={slug}
                setValue={setSlug}
                title="Ярлык источника"
                color="white"
                infoText="Генерируется автоматически"
                trackLength
                lengthLimit={30}
            />

            <Button onClick={() => createSourceMutation.mutate()} loading={createSourceMutation.isPending}>
                Создать
            </Button>
        </div>
    );
};

export default CreateTaskSourceForm;
