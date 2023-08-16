import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './style.sass'
import { url } from '../../constants';
import { Link, useNavigate } from 'react-router-dom'
import { setNameRedux, } from '../../store/toolkitReducer';
import { useAppDispatch } from '../../store'
import useAuth from '../hooks/useAuth';
const Registration = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [registrationError, setRegistrationError] = useState('')
    const navigate = useNavigate()

    const isAuth = useAuth()
    const dispatch = useAppDispatch()
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
        fetch(url + '/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.isRegistered) {
                    dispatch(setNameRedux({
                        avatar: 'https://vk.com/images/camera_200.png',
                        author: username
                    }))
                    navigate('/')
                }
                setRegistrationError(data.message)
            })
    }
    return (
        <div className='registration-container'>
            <div className='registration-title'>
                Регистрация
            </div>
            <div className='registration-login'>
                <TextField
                    onChange={(e) => setUsername(e.target.value)}
                    className='width100'
                    id="outlined"
                    label="Login"
                />
            </div>
            <div className='registration-password'>
                <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    className='width100'
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                />
            </div>
            <Link className='registration-authorization' to='/authorization'>Уже есть аккаунт? Вход</Link>
            <div className='registration-error'>
                {registrationError}
            </div>
            <Button onClick={() => {
                handleRegistration(username, password)
            }} className='width100' size="large" variant="contained">Login</Button>
        </div>
    );
};

export default Registration;