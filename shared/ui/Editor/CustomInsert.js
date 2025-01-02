'use client';

export class CustomInsert {
    static get toolbox() {
        return {
            title: 'Вставка',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z" /><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M16 4h2a2 2 0 0 1 2 2v2M11 14h10" /><path d="m17 10 4 4-4 4" /></svg>',
        };
    }

    constructor({ data, config, api }) {
        this.uniqueId = Date.now();
        this.data = data || {};
        this.api = api;

        this.button = null;
        this.content = null;

        this.choosedInsert = config.choosedInsert;
        this.setChoosedInsert = config.setChoosedInsert;

        this.subscribeToInsert = config.subscribeToInsert;
        this.setInsertModalHandler = config.setInsertModalHandler;

        if (this.subscribeToInsert) {
            this.subscribeToInsert(this.updateInsert, this.uniqueId);
        }
    }

    render() {
        const container = document.createElement('div');
        container.classList.add('insertInner');

        this.content = document.createElement('div');
        this.content.classList.add('insertContent');
        this.updateContent();
        container.appendChild(this.content);

        this.button = document.createElement('button');
        this.button.textContent = this.choosedInsert ? 'Заменить' : 'Выбрать';
        this.button.classList.add('insertButton');
        this.button.addEventListener('click', this.openModal);
        container.appendChild(this.button);

        if (this.data?.insert?.id && this.data?.insert?.content) {
            this.choosedInsert = {
                content: this.data.insert.content,
                id: this.data.insert.id,
            };
            this.updateContent();
        }

        return container;
    }

    openModal = () => {
        if (this.setInsertModalHandler && this.uniqueId) {
            this.setInsertModalHandler(this.uniqueId);
        }
    };

    updateContent() {
        if (this.content) {
            this.content.innerHTML = this.choosedInsert ? `${this.choosedInsert.content}` : 'Выберите вставку..';
        }

        if (this.button) {
            this.button.textContent = this.choosedInsert ? 'Заменить' : 'Выбрать';
        }
    }

    updateInsert = (newInsert, id) => {
        if(this.uniqueId !== id) return;

        this.choosedInsert = {
            content: newInsert.content,
            id: newInsert.id,
        };
        this.updateContent();
    };

    save() {
        return {
            insert: this.choosedInsert || null,
        };
    }

    destroy() {
        if (this.button) {
            this.button.removeEventListener('click', this.openModal);
        }
    }
}
