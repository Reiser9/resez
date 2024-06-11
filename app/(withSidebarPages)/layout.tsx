import styles from '@/shared/styles/base.module.scss';

import { Sidebar } from '@/widgets/Sidebar';
import { Header } from '@/widgets/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.app}>
            <Header />

            <div className={styles.wrapper}>
                <Sidebar />

                {children}
            </div>
        </div>
    );
}
