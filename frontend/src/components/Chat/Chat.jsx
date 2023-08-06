import React, { useEffect, useRef, useState } from 'react';
import './style.sass'
import socket from '../../socket';
import { url } from '../../constants';
import useUser from '../hooks/useUser';
import EnemyMessage from './EnemyMessage';
import MyMessage from './MyMessage';
import { Input, Button, Space } from 'antd';
import { SendOutlined } from '@ant-design/icons'
import { useParams } from 'react-router';


const Chat = () => {
    const params = useParams()
    console.log(params)
    const id = params.id
    const { author, avatar } = useUser()
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const chatRef = useRef(null)
    useEffect(() => {
        chatRef.current.scrollIntoView() //прокрутка до нового сообщения типо работает но выглядит не супер )) на невысоких устройствах ваще говно
    }, [messages])
    useEffect(() => {
        console.log('useEffect ID')
        socket.emit('join', id)

        socket.on('joined', async (roomId) => {
            await fetch(url + `/chats?room=${roomId}`)
                .then(res => res.json())
                .then(data => setMessages(data.messages))
        })
    }, [id])
    useEffect(() => {
        console.log('useEffect')

        socket.on('message', (mes) => {   //почему оно срабатывает каждый раз а не только при загрузке страницы, ну типо сообщения приходят все гуд, но я немного не понял как это работает под капотом , будет збс если ты пояснишь))
            console.log(mes)
            setMessages(prev => [...prev, mes])
        })
        chatRef.current.scrollIntoView()
    }, [])




    function handleButton() {
        if (!value) {
            return
        }
        socket.emit('message', {
            message: value,
            author,
            avatar
        })
        setValue('')
    }
    return (
        <div className='chat'>
            <div className='messages-container'>
                {messages.map(it => {
                    return (
                        it.author === author ?
                            <MyMessage key={it.date} it={it} />
                            :
                            <EnemyMessage key={it.date} it={it} />
                    )
                })}
                <div ref={chatRef}></div>
            </div>

            <div className='chat-send' >
                <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder='Введите сообщение'
                    style={{
                        marginRight: 10
                    }}
                    onPressEnter={handleButton}
                />
                <Button
                    onClick={handleButton}
                    type="primary"><SendOutlined /></Button>
            </div>
        </div>
    );
};

export default Chat;