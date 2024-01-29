import React from 'react';

import { socket } from '@/api/socket';

// import { incrementUreadNotifyCount, setUserBlocked, updatePermissions } from '../redux/slices/user';
// import { addNotifyInStart } from '../redux/slices/notify';

import { useAppDispatch, useAppSelector } from './useRedux';
import useNotify from './useAlert';
import useRequest from './useRequest';
import { setUserBlockReason, setUserBlocked } from '@/store/slices/user';

const useSocket = () => {
    const { isAuth, user, sessionId } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const { alertNotify } = useNotify();
    const { clearLocalData } = useRequest();

    React.useEffect(() => {
        if (!user?.id || !sessionId || !isAuth) {
            return;
        }

        socket.emit('join', user?.id, sessionId);
    }, [isAuth, user, sessionId]);

    React.useEffect(() => {
        socket.connect();

        // socket.on("notify", data => {
        //     dispatch(addNotifyInStart(data.notify));
        //     dispatch(incrementUreadNotifyCount());
        //     alertNotify("Информация", "Новое уведомление", "info", "/notifies", 4000);
        // });

        socket.on('end-session', () => {
            clearLocalData();
            alertNotify('Сессия завершена', 'Кто-то завершил вашу сессию', 'error');
        });

        socket.on('blocked', (data: { reason: string | null }) => {
            alertNotify('Ваш аккаунт заблокирован', 'По всем вопросам можете обращаться в группу в вк', 'warn');
            dispatch(setUserBlocked(true));
            dispatch(setUserBlockReason(data.reason));
        });

        socket.on('unblocked', () => {
            dispatch(setUserBlocked(false));
        });

        // socket.on("new-permissions", (data) => {
        //     dispatch(updatePermissions(data.permissions));
        //     alertNotify("Ваша роль обновлена", "Кто-то изменил вашу роль", "info", "", 4000);
        // });

        return () => {
            // socket.off("notify");
            socket.off("end-session");
            socket.off("blocked");
            socket.off("unblocked");
            // socket.off("new-permissions");
        };
    }, []);
};

export default useSocket;
