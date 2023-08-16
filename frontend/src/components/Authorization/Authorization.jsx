import React, { useEffect, useState } from 'react';
import './style.sass'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import { url } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { setNameRedux, } from '../../store/toolkitReducer';
import { useAppDispatch } from '../../store'
import useAuth from '../hooks/useAuth';

const Authorization = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [authorizationError, setAuthorizationError] = useState('')
    const isAuth = useAuth()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, []) //типо если чел уже авторизован и нажимает кнопку "назад" то не появлялось снова страница регистрации 
    function handleRegistration(username, password) {
        let user = {
            username,
            password
        }
        fetch(url + '/authorization', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.token) {
                    dispatch(setNameRedux({
                        avatar: 'https://vk.com/images/camera_200.png', //При авторизации сделать запрос на бэк и получить аватарку и username
                        author: username
                    }))
                    navigate('/')
                }
                console.log(data)
                setAuthorizationError(data.message)
            })
    }
    return (
        <div className='authorization-container'>
            <div className='authorization-title'>
                Вход
            </div>
            <div className='authorization-login'>
                <TextField
                    onChange={(e) => setUsername(e.target.value)}
                    className='width100'
                    id="outlined"
                    label="Login"
                />
            </div>
            <div className='authorization-password'>
                <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    className='width100'
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                />
            </div>
            <Link className='authorization-registration' to='/registration'>Регистрация</Link>
            <div className='authorization-error'>
                {authorizationError}
            </div>
            <Button onClick={() => {
                handleRegistration(username, password)
            }} className='width100' size="large" variant="contained">Login</Button>
        </div>
    );
};

export default Authorization;