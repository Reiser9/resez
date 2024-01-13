import styles from '@/shared/styles/base.module.scss';

import { Header } from '@/widgets/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.app}>
            <Header empty />

            <div className={styles.wrapper}>{children}</div>
        </div>
    );
}