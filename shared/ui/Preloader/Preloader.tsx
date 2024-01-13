import { HTMLAttributes } from "react";
import cn from "classnames";

import styles from "./index.module.scss";

type Props = {
    small?: boolean;
    fill?: boolean;
    page?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const Preloader: React.FC<Props> = ({
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
                className={cn(styles.preloader, className, {
                    [styles.small]: small,
                })}
            ></div>
        </div>
    );
};

export default Preloader;
