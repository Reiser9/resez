'use client';

import React from 'react';
import { Tooltip } from 'antd';

import styles from './index.module.scss';

import { Link } from '@/shared/icons';
import { copyText } from '@/shared/utils/copyText';

type Props = {
    link: string;
};

const CopyLink: React.FC<Props> = ({ link }) => {
    const [linkCopied, setLinkCopied] = React.useState(false);

    const copyBattleLink = () => {
        copyText(`${window.location.host}/i/${link}`);
        setLinkCopied(true);

        setTimeout(() => {
            setLinkCopied(false);
        }, 2000);
    };

    return (
        <Tooltip destroyTooltipOnHide title={linkCopied ? 'Скопировано' : 'Скопировать'}>
            <div className={styles.copyLink} onClick={copyBattleLink}>
                {window.location.host}/i/{link}
                <Link />
            </div>
        </Tooltip>
    );
};

export default CopyLink;
