import { useEffect, useState } from 'react'
import { BsCameraVideo, BsPhone } from 'react-icons/bs'

import socket from '../../../socket'
import { useSelector } from 'react-redux'
import { callDataRedux } from '../../../store/toolkitReducer'
import useUser from '../../hooks/useUser'

export const MainWindow = ({ startCall }) => {
    const { callTo } = useSelector(callDataRedux)
    const { avatar, author } = useUser()
    useEffect(() => {
        const id = author
        socket
            .on('init', ({ id }) => {})
            .emit('init', id) //сюда я передаю айди юзера по которому он подключается в сокеты
    }, [])

    const callWithVideo = (video) => {
        const config = { audio: true, video }
        startCall(true, callTo, config) // в remoteId я должен передавать айди юзера которому звоню
    }
    // в моем понимании, должна быть таблица со всеми юзерами, там должно быть поле userWebRTC_id (как то так названо) и при нажатии на клавишу вызова на карточке юзера , я должен иметь возможность получить этот айди (того пользователя которого я выбрал) и установить с ним пирконекшен
    return (
        <div className='container main-window'>
            <div className='control'>
                <button onClick={() => callWithVideo(true)}>
                    <BsCameraVideo />
                </button>
                <button onClick={() => callWithVideo(false)}>
                    <BsPhone />
                </button>
            </div>
        </div>
    )
}

export default MainWindow;