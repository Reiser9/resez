import styles from '@/shared/styles/base.module.scss';
import { NoAuthWrapper } from '@/shared/wrappers/NoAuthWrapper';

import { Header } from '@/widgets/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <NoAuthWrapper>
            <div className={styles.app}>
                <Header empty />

                <div className={styles.wrapper}>{children}</div>
            </div>
        </NoAuthWrapper>
    );
}
