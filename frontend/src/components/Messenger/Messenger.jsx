import React, { useEffect, useState } from 'react';
import './style.sass'
import Chat from '../Chat/Chat';
import { url } from '../../constants';
import useUser from '../hooks/useUser';
import { Link, useNavigate } from 'react-router-dom'
import socket from '../../socket';
import useAuth from '../hooks/useAuth';
import { useAppDispatch } from '../../store';
import { setCallDataRedux } from '../../store/toolkitReducer';
const Messenger = () => {
    const [id, setId] = useState()
    const [users, setUsers] = useState([])
    const { author } = useUser()
    const isAuth = useAuth()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    useEffect(() => {
        fetch(url + '/getAllUsers')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])
    useEffect(() => {
        if (!isAuth) {
            navigate('/authorization')
        }
    }, [])
    function getRoomId(str) {

        const arr = [str, author]
        return arr.sort((a, b) => a > b ? 1 : -1).join('')
    }
    return (
        <div className='messenger'>
            {id ?
                <Chat id={id} />
                :
                <div className='messenger-contacts'>
                    {users.map((it) => {
                        return (
                            <Link
                                onClick={() => dispatch(setCallDataRedux({ video: false, callTo: it.username }))}
                                className='messenger-contacts-user'
                                to={`/messages/${getRoomId(it.username)}`}>
                                <img className='messenger-contacts-user-avatar' src={it.avatar || 'https://vk.com/images/camera_200.png'} alt="" />
                                <div className='messenger-contacts-user-name'>
                                    {it.username}
                                </div>
                            </Link>
                        )
                    })}

                </div>}

            {id && <Chat id={id} />}


        </div>
    );
};

export default Messenger;