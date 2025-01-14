'use client';

import React from 'react';
import cn from 'classnames';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import List from '@editorjs/list';
import Code from '@editorjs/code';
import Image from '@editorjs/image';
import Raw from '@editorjs/raw';
import Header from '@editorjs/header';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';
import { OutputData } from '@editorjs/editorjs';
import { ToolConstructable } from '@editorjs/editorjs/types/tools/index';
import { ToolSettings } from '@editorjs/editorjs/types/tools/tool-settings';
import { createReactEditorJS } from 'react-editor-js';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { TaskSnippetDTO } from '@/entities/task-snippet';
import { EDITOR_TRANSLATE } from '@/shared/consts/EDITOR_TRANSLATE';
import { CustomMath } from './CustomMathTool';
import { CustomFiles } from './CustomFiles';
import { CustomVoice } from './CustomVoice';
import { CustomInsert } from './CustomInsert';
import { useFile } from '@/features/file';
import { useTaskSnippet } from '@/features/task-snippet';
import { Cross } from '@/shared/icons';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';
import { TaskSnippetItem } from '@/entities/task-snippet/ui';

import { Text } from '../Text';
import { Modal } from '../Modal';
import { Preloader } from '../Preloader';
import { NotContent } from '../NotContent';

const ReactEditorJS = createReactEditorJS();

type Tools =
    | 'embed'
    | 'header'
    | 'table'
    | 'list'
    | 'code'
    | 'image'
    | 'raw'
    | 'marker'
    | 'checklist'
    | 'inlineCode'
    | 'simpleImage'
    | 'math'
    | 'files'
    | 'audio'
    | 'insert';

type Props = {
    placeholder?: string;
    id?: string | undefined;
    minHeight?: number;
    title?: string;
    editorRef: React.MutableRefObject<EditorCore | null>;
    onReady?: () => void;
    enabledTools?: Tools[];
};

export interface EditorCore {
    destroy(): Promise<void>;
    clear(): Promise<void>;
    save(): Promise<OutputData>;
    render(data: OutputData): Promise<void>;
    get dangerouslyLowLevelInstance(): any | null;
}

const subscribers: ((insert: TaskSnippetDTO, id: number) => void)[] = [];

const Editor: React.FC<Props> = (props) => {
    const [insertModal, setInsertModal] = React.useState(false);
    const [choosedInsert, setChoosedInsert] = React.useState<TaskSnippetDTO | null>(null);
    const [choosedInsertId, setChoosedInsertId] = React.useState<number | null>(null);

    const {
        placeholder = '',
        id = '',
        minHeight = 60,
        title,
        editorRef,
        onReady,
        enabledTools = [
            'embed',
            'header',
            'table',
            'list',
            'code',
            'image',
            'raw',
            'marker',
            'checklist',
            'inlineCode',
            'simpleImage',
            'math',
            'files',
            'audio',
            'insert',
        ],
        ...editorProps
    } = props;

    const { uploadImageOnServerByUrl, uploadFile } = useFile();

    const handleInitialize = React.useCallback(
        (instance: EditorCore) => {
            editorRef.current = instance;
        },
        [editorRef],
    );

    const uploadImageByUrl = async (url: string) => {
        return await uploadImageOnServerByUrl(url);
    };

    const uploadFileHandler = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        return await uploadFile(formData);
    };

    const subscribeToInsert = (callback: (insert: TaskSnippetDTO, id: number) => void) => {
        subscribers.push(callback);
    };

    const handleSelectInsertion = (insert: TaskSnippetDTO, id: number | null) => {
        if (!id) return;

        setChoosedInsert(insert);
        subscribers.forEach((callback) => callback(insert, id));
        setInsertModal(false);
    };

    const setInsertModalHandler = (id: number) => {
        setInsertModal(true);
        setChoosedInsertId(id);
    };

    const EDITOR_TOOLS: { [toolName: string]: ToolConstructable | ToolSettings } = {
        ...(enabledTools?.includes('embed') && { embed: Embed }),
        ...(enabledTools?.includes('header') && {
            header: {
                class: Header,
                inlineToolbar: true,
            },
        }),
        ...(enabledTools?.includes('table') && { table: Table }),
        ...(enabledTools?.includes('list') && { list: List }),
        ...(enabledTools?.includes('code') && { code: Code }),
        ...(enabledTools?.includes('image') && {
            image: {
                class: Image,
                config: {
                    uploader: {
                        uploadByFile: uploadFileHandler,
                        uploadByUrl: uploadImageByUrl,
                    },
                },
            },
        }),
        ...(enabledTools?.includes('raw') && { raw: Raw }),
        ...(enabledTools?.includes('marker') && { marker: Marker }),
        ...(enabledTools?.includes('checklist') && { checklist: CheckList }),
        ...(enabledTools?.includes('inlineCode') && { inlineCode: InlineCode }),
        ...(enabledTools?.includes('simpleImage') && { simpleImage: SimpleImage }),
        ...(enabledTools?.includes('math') && { math: CustomMath }),
        ...(enabledTools?.includes('files') && {
            files: {
                class: CustomFiles as any,
                config: {
                    uploadRequest: uploadFileHandler,
                },
            },
        }),
        ...(enabledTools?.includes('audio') && {
            audio: {
                class: CustomVoice as any,
                config: {
                    uploadRequest: uploadFileHandler,
                },
            },
        }),
        ...(enabledTools?.includes('insert') && {
            insert: {
                class: CustomInsert as any,
                config: {
                    setInsertModalHandler,
                    choosedInsert,
                    setChoosedInsert,
                    subscribeToInsert,
                },
            },
        }),
    };

    const { getPagginationTasksSnippets } = useTaskSnippet();

    const { data, endPage, isPending, isError, isFetchingNextPage } = useInfiniteScroll({
        queryKey: ['admin_task_snippets'],
        queryFn: (pageParam) => getPagginationTasksSnippets(pageParam),
        enabled: insertModal,
    });

    return (
        <>
            <div className={styles.editorWrapper}>
                {title && <Text variant="text3">{title}</Text>}

                <ReactEditorJS
                    onInitialize={handleInitialize}
                    tools={EDITOR_TOOLS}
                    minHeight={minHeight}
                    holder={id}
                    placeholder={placeholder}
                    i18n={EDITOR_TRANSLATE}
                    onReady={onReady}
                    {...editorProps}
                >
                    <div id={id} className={styles.editor}></div>
                </ReactEditorJS>
            </div>

            {enabledTools?.includes('insert') && (
                <Modal
                    title={`Вставки (${
                        !isError && !isPending && !!data?.pages[0]?.totalCount && data?.pages[0]?.totalCount
                    })`}
                    value={insertModal}
                    setValue={setInsertModal}
                >
                    {isPending ? (
                        <Preloader page small />
                    ) : isError ? (
                        <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
                    ) : data?.pages[0]?.totalCount ? (
                        <div className={cn(base.baseWrapperGap16, base.aic)}>
                            <div className={base.contentItems}>
                                {data?.pages.map((task) =>
                                    task?.snippets.map((data) => (
                                        <TaskSnippetItem
                                            key={data.id}
                                            data={data}
                                            choose
                                            chooseCallback={() => handleSelectInsertion(data, choosedInsertId)}
                                        />
                                    )),
                                )}
                            </div>

                            {isFetchingNextPage && <Preloader offIndent small page />}

                            {!isFetchingNextPage && <div ref={endPage}></div>}
                        </div>
                    ) : (
                        <NotContent text="Вставок заданий не найдено" />
                    )}
                </Modal>
            )}
        </>
    );
};

Editor.displayName = 'editor';

export default Editor;
