'use client';

import React from 'react';
import parse, { DOMNode, Text } from 'html-react-parser';
import { StaticMathField, addStyles } from 'react-mathquill';

addStyles();

type ModifyElement = Text & {
    data: string | undefined;
};

const CustomHtmlParser = ({ html }: { html?: string }) => {
    if (!html) {
        return;
    }

    return parse(html, {
        replace: (node: DOMNode) => {
            if (node?.type === 'tag' && node?.attribs?.class === 'mathquill') {
                const content = node.children[0] as ModifyElement;

                if (node?.name === 'span') {
                    return (
                        <span className="mathquill">
                            <StaticMathField>{content.data}</StaticMathField>
                        </span>
                    );
                } else {
                    return (
                        <p className="mathquill">
                            <StaticMathField>{content.data}</StaticMathField>
                        </p>
                    );
                }
            }

            return undefined;
        },
    });
};

export default CustomHtmlParser;
