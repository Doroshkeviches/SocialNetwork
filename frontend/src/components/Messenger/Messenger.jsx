import React, { useEffect, useState } from 'react';
import './style.sass'
import Chat from '../Chat/Chat';
import { url } from '../../constants';
import useUser from '../hooks/useUser';
import { Link } from 'react-router-dom'
import socket from '../../socket';
const Messenger = () => {
    const [id, setId] = useState()
    const [users, setUsers] = useState([])
    const { author } = useUser()
    useEffect(() => {
        fetch(url + '/getAllUsers')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])
    function getRoomId(str) {
        const arr = [str, author]
        return arr.sort((a, b) => a - b).join('')
    }
    return (
        <div className='messenger'>
            {id ?
                <Chat id={id} />
                :
                <div className='messenger-contacts'>
                    {users.map((it) => {
                        console.log(it)
                        return (
                            <Link
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