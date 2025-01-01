import { OutputBlockData } from '@editorjs/editorjs';

export const getHtmlInEditor = (blocks: OutputBlockData[] = []) => {
    if (!blocks || blocks.length === 0) {
        return;
    }

    let html = '';

    blocks.forEach((block) => {
        switch (block.type) {
            case 'header':
                const { level, text } = block.data || {};
                html += `<h${level}>${text}</h${level}>`;
                break;
            case 'paragraph':
                html += `<p>${block.data.text}</p>`;
                break;
            case 'list':
                const { style, items } = block.data || {};
                html += `${style === 'ordered' ? '<ol>' : '<ul>'}`;

                items.forEach((item: string) => {
                    html += `<li>${item}</li>`;
                });

                html += `${style === 'ordered' ? '</ol>' : '</ul>'}`;
                break;
            case 'table':
                const { content, withHeadings } = block.data || {};
                html += `<div class="tableContent"><table>`;

                if (withHeadings) {
                    html += `<thead><tr>`;
                    content[0].forEach((header: string) => {
                        html += `<th>${header}</th>`;
                    });
                    html += `</tr></thead>`;

                    html += `<tbody>`;
                    content.slice(1).forEach((row: string[]) => {
                        html += `<tr>`;
                        row.forEach((cell) => {
                            html += `<td>${cell}</td>`;
                        });
                        html += `</tr>`;
                    });
                } else {
                    html += `<tbody>`;
                    content.forEach((row: string[]) => {
                        html += `<tr>`;
                        row.forEach((cell) => {
                            html += `<td>${cell}</td>`;
                        });
                        html += `</tr>`;
                    });
                }

                html += `</tbody></table></div>`;
                break;
            case 'code':
                html += `<pre><code>${block.data.code}</code></pre>`;
                break;
            case 'raw':
                html += block.data.html;
                break;
            case 'checklist':
                html += `<ol>`;

                block.data.items.forEach((item: { checked: boolean; text: string }) => {
                    const checked = item.checked ? 'checked' : '';
                    html += `<li><input type="checkbox" ${checked} disabled>${item.text}</li>`;
                });

                html += `</ol>`;
                break;
            case 'image':
                const { file, caption } = block.data || {};
                html += `<div class="blockImage"><img src="${file.url}" alt="${caption}"></div>`;
                break;
            case 'files':
                if (block.data?.fileUrl) {
                    const { fileUrl, fileName, fileDownloaded, uniqueId } = block.data || {};

                    const downloadAttribute = fileDownloaded == 'true' ? `download` : ``;
                    html += `<a href="${fileUrl}" target="_blanc" data-unique=${uniqueId} data-downloaded=${fileDownloaded} ${downloadAttribute}>${fileName}</a>`;
                }
                break;
            case 'audio':
                if (block.data?.audioUrl) {
                    const { audioName, audioUrl, uniqueId } = block.data || {};

                    html += `<div class="blockAudio">
                        <audio data-unique=${uniqueId} data-name="${audioName}" controls>
                            <source src="${audioUrl}" type="audio/mpeg" />
                            <p>
                                Ваш браузер не поддерживает HTML5 аудио. Ссылка на аудио
                                <a href="${audioUrl}">ссылка на аудио</a>
                            </p>
                        </audio>
                    </div>`;
                }
                break;
            case 'math':
                if (block.data?.latex) {
                    const { type, latex } = block.data || {};

                    if (type === 'block') {
                        html += `<p class="mathquill">${latex}</p>`;
                    } else {
                        html += `<span class="mathquill">${latex}</span>`;
                    }
                }
                break;
            case 'insert':
                // <snippet id=1 />
                break;
            default:
                break;
        }
    });

    return html;
};

export const convertHtmlToEditorBlocks = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const blocks: OutputBlockData[] = [];

    doc.body.childNodes.forEach((node) => {
        if (!(node instanceof Element)) return;

        let block: OutputBlockData = {
            data: '',
            type: '',
        };

        if (
            node.nodeName === 'H1' ||
            node.nodeName === 'H2' ||
            node.nodeName === 'H3' ||
            node.nodeName === 'H4' ||
            node.nodeName === 'H5' ||
            node.nodeName === 'H6'
        ) {
            block.type = 'header';
            block.data = {
                level: parseInt(node.nodeName.substring(1), 10),
                text: node.innerHTML,
            };
        } else if ((node.nodeName === 'SPAN' || node.nodeName === 'P') && node.className === 'mathquill') {
            block.type = 'math';
            block.data = {
                type: node.nodeName === 'P' ? 'block' : 'line',
                latex: node.innerHTML,
            };
        } else if (node.nodeName === 'P') {
            block.type = 'paragraph';
            block.data = {
                text: node.innerHTML,
            };
        } else if (node.nodeName === 'UL' || node.nodeName === 'OL') {
            block.type = 'list';
            block.data = {
                items: [],
            };
            block.data.style = node.nodeName === 'UL' ? 'unordered' : 'ordered';

            node.childNodes.forEach((itemNode) => {
                if (!(itemNode instanceof Element)) return;

                if (itemNode.nodeName === 'LI') {
                    block.data.items.push(itemNode.innerHTML);
                }
            });
        } else if (node.nodeName === 'DIV' && node.className === 'blockImage') {
            block.type = 'image';
            block.data = {
                file: {
                    url: node.querySelector('img')?.getAttribute('src'),
                },
                caption: node.querySelector('img')?.getAttribute('alt'),
            };
        } else if (node.nodeName === 'DIV' && node.className === 'blockAudio') {
            block.type = 'audio';
            block.data = {
                file: {
                    url: node.getElementsByTagName('audio')[0].getElementsByTagName('source')[0].getAttribute('src'),
                },
                audioName: node.getElementsByTagName('audio')[0].getAttribute('data-name'),
                uniqueId: node.getElementsByTagName('audio')[0].getAttribute('data-unique'),
            };
        } else if (node.nodeName === 'DIV') {
            block.type = 'table';
            block.data = {
                content: [],
                withHeadings: false,
            };

            const thead = node.querySelector('thead');
            const rows = node.querySelectorAll('tr');

            if (thead) {
                block.data.withHeadings = true;

                thead.querySelectorAll('tr').forEach((rowNode) => {
                    const row: string[] = [];
                    rowNode.querySelectorAll('th').forEach((cellNode) => {
                        row.push(cellNode.innerHTML);
                    });
                    block.data.content.push(row);
                });
            }

            rows.forEach((rowNode) => {
                if (thead && thead.contains(rowNode)) {
                    return;
                }

                const row: string[] = [];
                rowNode.querySelectorAll('td').forEach((cellNode) => {
                    row.push(cellNode.innerHTML);
                });
                block.data.content.push(row);
            });
        } else if (node.nodeName === 'PRE') {
            block.type = 'code';
            block.data = {
                code: node.querySelector('code')?.innerHTML,
            };
        } else if (node.nodeName === 'A') {
            block.type = 'files';
            block.data = {
                file: {
                    url: node.getAttribute('href'),
                },
                fileName: node.textContent,
                fileDownloaded: node.getAttribute('data-downloaded'),
                uniqueId: node.getAttribute('data-unique'),
            };
        } else {
            block.type = 'raw';
            block.data = {
                html: node.outerHTML,
            };
        }

        blocks.push(block);
    });

    return blocks;
};
