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
        this.data = data;
        this.config = config;
        this.api = api;

        this.fileInputRef = React.createRef();
        this.fileInputRef.current = this.createFileInput();
        this.fileNameInput = null;
    }

    createFileInput = () => {
        const input = document.createElement('input');
        input.id = 'chooseAudio';
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
        const container = document.createElement('div');

        container.classList.add('chooseFileInner');
        container.appendChild(this.fileInputRef.current);

        this.fileNameInput = document.createElement('input');
        this.fileNameInput.classList.add('chooseFileNameInput');
        this.fileNameInput.type = 'text';
        this.fileNameInput.placeholder = 'Введите название';

        container.appendChild(this.fileNameInput);
        this.fileNameInput.focus();

        const label = document.createElement('label');
        label.classList.add('chooseFileButton');
        label.htmlFor = 'chooseAudio';
        label.textContent = 'Загрузить аудио';

        container.appendChild(label);

        if (this.data?.audio?.url) {
            this.fileNameInput.value = this.data?.audioName;
        } else {
            this.fileInputRef.current.click();
        }

        return container;
    }

    handleFileChange = (event) => {
        const file = event.target.files[0];

        this.uploadFile(file);
    };

    uploadFile = (file) => {
        if (!file) {
            return;
        }

        const { uploadRequest } = this.config;

        uploadRequest(file)
            .then((data) => {
                this.data.audio = data.file;
                this.fileNameInput.value = file.name;
            })
            .catch((error) => {
                console.error('Error saving file:', error);
            });
    };

    save = () => {
        if (this.data?.audio) {
            const audioName = this.fileNameInput.value;

            return {
                audioUrl: this.data?.audio?.url,
                audioName: audioName,
            };
        }
    };
}
