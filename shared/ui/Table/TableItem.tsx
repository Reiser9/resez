<<<<<<< HEAD
'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

type Props = {
    status?: 'error' | 'success' | 'warn';
    head?: boolean;
    id?: string;
    text?: string;
    value?: string;
};

const TableItem: React.FC<Props> = ({ status = '', head = false, id, text, value }) => {
    return (
        <div className={cn(styles.pointItem, styles[status])}>
            {id && <p className={head ? styles.pointItemHeadId : styles.pointItemCellId}>{id}</p>}

            {text && <p className={head ? styles.pointItemHead : styles.pointItemCell}>{text}</p>}

            {value && <p className={head ? styles.pointItemHead : styles.pointItemCell}>{value}</p>}
        </div>
    );
};

export default TableItem;
=======
'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

type Props = {
    status?: 'error' | 'success' | 'warn';
    head?: boolean;
    id?: string;
    text?: string;
    value?: string;
};

const TableItem: React.FC<Props> = ({ status = '', head = false, id, text, value }) => {
    return (
        <div className={cn(styles.pointItem, styles[status])}>
            {id && <p className={head ? styles.pointItemHeadId : styles.pointItemCellId}>{id}</p>}

            {text && <p className={head ? styles.pointItemHead : styles.pointItemCell}>{text}</p>}

            {value && <p className={head ? styles.pointItemHead : styles.pointItemCell}>{value}</p>}
        </div>
    );
};

export default TableItem;
>>>>>>> c61da454dd30e7ca31637fe711cf5e35c92c2018
