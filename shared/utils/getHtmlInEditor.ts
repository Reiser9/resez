export const getHtmlInEditor = (blocks = []) => {
    if (!blocks || blocks.length === 0) {
        return;
    }

    // let html = '';

    // blocks.forEach((block) => {
    //     switch (block.type) {
    //         case 'header':
    //             html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
    //             break;
    //         case 'paragraph':
    //             html += `<p>${block.data.text}</p>`;
    //             break;
    //         case 'list':
    //             html += `${block.data.style === 'ordered' ? '<ol>' : '<ul>'}`;

    //             block.data.items.forEach((item) => {
    //                 html += `<li>${item}</li>`;
    //             });

    //             html += `${block.data.style === 'ordered' ? '</ol>' : '</ul>'}`;
    //             break;
    //         case 'table':
    //             html += `<div class="tableContent"><table><thead><tr>`;

    //             block.data.content[0].forEach((header) => {
    //                 html += `<th>${header}</th>`;
    //             });

    //             html += `</tr></thead><tbody>`;

    //             block.data.content.slice(1).forEach((row) => {
    //                 html += `<tr>`;
    //                 row.forEach((cell) => {
    //                     html += `<td>${cell}</td>`;
    //                 });
    //                 html += `</tr>`;
    //             });

    //             html += `</tbody></table></div>`;
    //             break;
    //         case 'code':
    //             html += `<pre><code>${block.data.code}</code></pre>`;
    //             break;
    //         case 'raw':
    //             html += block.data.html;
    //             break;
    //         case 'checklist':
    //             html += `<ol>`;

    //             block.data.items.forEach((item) => {
    //                 const checked = item.checked ? 'checked' : '';
    //                 html += `<li><input type="checkbox" ${checked} disabled>${item.text}</li>`;
    //             });

    //             html += `</ol>`;
    //             break;
    //         case 'image':
    //             html += `<div class="blockImage"><img src="${block.data.file.url}" alt="${block.data.caption}"></div>`;
    //             break;
    //         case 'files':
    //             if (block.data?.fileUrl) {
    //                 html += `<a href="${block.data?.fileUrl}" target="_blanc">${
    //                     block.data?.fileName || 'Файл без названия'
    //                 }</a>`;
    //             }
    //             break;
    //         case 'math':
    //             if (block.data?.latex) {
    //                 if (block.data?.type === 'block') {
    //                     html += `<p class="mathquill">${block.data?.latex}</p>`;
    //                 } else {
    //                     html += `<span class="mathquill">${block.data?.latex}</span>`;
    //                 }
    //             }
    //             break;
    //         default:
    //             break;
    //     }
    // });

    // return html;
};

// export const convertHtmlToEditorBlocks = (html) => {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, 'text/html');

//     const blocks = [];

//     doc.body.childNodes.forEach((node) => {
//         const block = {};

//         if (
//             node.nodeName === 'H1' ||
//             node.nodeName === 'H2' ||
//             node.nodeName === 'H3' ||
//             node.nodeName === 'H4' ||
//             node.nodeName === 'H5' ||
//             node.nodeName === 'H6'
//         ) {
//             block.type = 'header';
//             block.data = {
//                 level: parseInt(node.nodeName.substring(1), 10),
//                 text: node.innerHTML,
//             };
//         } else if ((node.nodeName === 'SPAN' || node.nodeName === 'P') && node.className === 'mathquill') {
//             block.type = 'math';
//             block.data = {
//                 type: node.nodeName === 'P' ? 'block' : 'line',
//                 latex: node.innerHTML,
//             };
//         } else if (node.nodeName === 'P') {
//             block.type = 'paragraph';
//             block.data = {
//                 text: node.innerHTML,
//             };
//         } else if (node.nodeName === 'UL' || node.nodeName === 'OL') {
//             block.type = 'list';
//             block.data = {
//                 items: [],
//             };

//             node.childNodes.forEach((itemNode) => {
//                 if (itemNode.nodeName === 'LI') {
//                     block.data.items.push(itemNode.innerHTML);
//                 }
//             });
//         } else if (node.nodeName === 'DIV' && node.className === 'blockImage') {
//             block.type = 'image';
//             block.data = {
//                 file: {
//                     url: node.querySelector('img').getAttribute('src'),
//                 },
//                 caption: node.querySelector('img').getAttribute('alt'),
//             };
//         } else if (node.nodeName === 'DIV') {
//             block.type = 'table';
//             block.data = {
//                 content: [],
//             };

//             node.querySelectorAll('tr').forEach((rowNode, rowIndex) => {
//                 const row = [];

//                 rowNode.querySelectorAll('th, td').forEach((cellNode) => {
//                     row.push(cellNode.innerHTML);
//                 });

//                 if (rowIndex === 0) {
//                     block.data.content.push(row);
//                 } else {
//                     block.data.content.push(row);
//                 }
//             });
//         } else if (node.nodeName === 'PRE') {
//             block.type = 'code';
//             block.data = {
//                 code: node.querySelector('code').innerHTML,
//             };
//         } else if (node.nodeName === 'A') {
//             block.type = 'files';
//             block.data = {
//                 file: {
//                     url: node.getAttribute('href'),
//                 },
//                 fileName: node.textContent,
//             };
//         } else {
//             block.type = 'raw';
//             block.data = {
//                 html: node.outerHTML,
//             };
//         }

//         blocks.push(block);
//     });

//     return blocks;
// };
