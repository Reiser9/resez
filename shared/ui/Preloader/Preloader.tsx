import { HTMLAttributes } from "react";
import cn from "classnames";

import styles from "./index.module.scss";

type Props = {
    theme?: 'primary' | 'danger';
    small?: boolean;
    fill?: boolean;
    page?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const Preloader: React.FC<Props> = ({
    theme = 'primary',
    small = false,
    fill = false,
    page = false,
    className,
    ...props
}) => {
    return (
        <div
            className={cn(styles.preloaderInner, {
                [styles.fill]: fill,
                [styles.page]: page,
            })}
            {...props}
        >
            <div
                className={cn(styles.preloader, className, styles[theme], {
                    [styles.small]: small,
                })}
            ></div>
        </div>
    );
};

export default Preloader;
