import React, { useEffect } from 'react';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import './style.sass'
import MyPagePostList from './MyPagePostList';
const MyPage = () => {
    const isAuth = useAuth()
    const navigate = useNavigate()
    // useEffect(() => {
    //     if (!isAuth) {
    //         navigate('/authorization')
    //     }
    // }, [])
    const { avatar, author } = useUser()
    return (
        <>
            <div className="my-page-header">
                <div className="my-page-header-main">
                    <img className="my-page-header-main-avatar" src={avatar} alt="avatar" />
                    <div className="my-page-header-main-author">
                        {author}
                    </div>
                </div>
            </div>
            <MyPagePostList/>
        </>
    );
};

export default MyPage;