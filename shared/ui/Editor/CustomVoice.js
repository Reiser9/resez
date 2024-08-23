'use client';

import React from 'react';

export class CustomVoice {
    static get toolbox() {
        return {
            title: 'Аудио',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-audio-lines"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/></svg>',
        };
    }

    constructor({ data, config, api }) {
        this.uniqueId = Date.now();
        this.data = data;
        this.config = config;
        this.api = api;

        this.voiceInputRef = React.createRef();
        this.voiceInputRef.current = this.createFileInput();
        this.voiceInner = null;
        this.voiceNameInput = null;
        this.voiceNameStatus = null;
    }

    createFileInput = () => {
        const input = document.createElement('input');
        input.id = `chooseAudio_${this.uniqueId}`;
        input.type = 'file';
        input.accept = '.mp3, .ogg';
        input.style.display = 'none';

        const handleFileChange = (event) => {
            this.handleFileChange(event);
        };

        input.addEventListener('change', handleFileChange);

        input._handleFileChange = handleFileChange;

        input.removeEventListenerAndCleanup = () => {
            if (input._handleFileChange) {
                input.removeEventListener('change', input._handleFileChange);
                delete input._handleFileChange;
            }
        };

        return input;
    };

    render() {
        if (this.data?.uniqueId) {
            this.uniqueId = this.data.uniqueId;
            this.voiceInputRef.current.id = `chooseAudio_${this.data.uniqueId}`;
        }

        this.voiceInner = document.createElement('div');
        this.voiceInner.classList.add('chooseInner');

        const inputContainer = document.createElement('div');
        inputContainer.classList.add('chooseInnerWrapper');
        this.voiceInner.appendChild(inputContainer);

        inputContainer.appendChild(this.voiceInputRef.current);

        this.voiceNameInput = document.createElement('input');
        this.voiceNameInput.classList.add('chooseNameInput');
        this.voiceNameInput.type = 'text';
        this.voiceNameInput.disabled = true;
        this.voiceNameInput.placeholder = 'Сначала требуется загрузить аудио';
        inputContainer.appendChild(this.voiceNameInput);

        const label = document.createElement('label');
        label.classList.add('chooseButton');
        label.htmlFor = `chooseAudio_${this.uniqueId}`;
        label.textContent = 'Выбрать аудио';
        inputContainer.appendChild(label);

        this.voiceNameStatus = document.createElement('div');
        this.voiceNameStatus.classList.add('chooseNameStatus');
        this.voiceNameStatus.textContent = 'Аудио не выбрано';
        this.voiceInner.appendChild(this.voiceNameStatus);

        if (this.data?.file?.url) {
            this.voiceNameInput.value = this.data?.audioName;
            this.voiceNameStatus.textContent = 'Аудио выбрано';
            this.voiceNameInput.disabled = false;
            this.voiceNameInput.placeholder = 'Введите название аудио';
        } else {
            this.voiceInputRef.current.click();
        }

        return this.voiceInner;
    }

    handleFileChange = (event) => {
        const file = event.target.files[0];

        this.uploadAudio(file);
    };

    uploadAudio = (audio) => {
        if (!audio) {
            return;
        }

        const { uploadRequest } = this.config;
        this.voiceNameInput.blur();
        this.voiceNameStatus.classList.remove('success', 'error');
        this.voiceInner.classList.add('disabled');
        this.voiceNameStatus.textContent = 'Загрузка аудио на сервер...';

        uploadRequest(audio)
            .then((data) => {
                if (!data) {
                    throw new Error();
                }

                this.data = data;
                this.voiceNameInput.value = audio.name;
                this.voiceNameInput.disabled = false;
                this.voiceNameInput.placeholder = 'Введите название аудио';
                this.voiceNameStatus.classList.add('success');
                this.voiceNameStatus.textContent = 'Аудио успешно загружено';
            })
            .catch((error) => {
                console.error('Error saving audio:', error);
                this.voiceNameStatus.classList.add('error');
                this.voiceNameStatus.textContent = 'Ошибка загрузки аудио';
                this.voiceInputRef.current.value = '';
                this.voiceNameInput.value = '';
                this.voiceNameInput.disabled = true;
                this.voiceNameInput.placeholder = 'Сначала требуется загрузить аудио';
            })
            .finally(() => {
                this.voiceInner.classList.remove('disabled');
            });
    };

    save = () => {
        if (this.data.file) {
            const audioName = this.voiceNameInput.value;

            return {
                audioUrl: this.data.file.url,
                audioName: audioName || 'Пустое название аудио',
                uniqueId: this.uniqueId,
            };
        }
    };
}
