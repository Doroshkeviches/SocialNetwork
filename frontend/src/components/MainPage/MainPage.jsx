import React, { useEffect } from 'react';
import './style.sass'
import PostList from './Posts/PostList';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import AddNewPost from './Posts/AddNewPost/AddNewPost';
const MainPage = () => {
    const isAuth = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuth) {
            navigate('/authorization')
        }
    }, [])
    return (
            <>
                <AddNewPost />
                <PostList />
            </>
    );
};

export default MainPage;