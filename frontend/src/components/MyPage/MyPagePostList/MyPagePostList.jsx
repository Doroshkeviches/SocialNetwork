import React, { useEffect, useState } from 'react';
import './style.sass'
import { url } from '../../../constants';
import useUser from '../../hooks/useUser';
import Post from '../../MainPage/Posts/Post';
const MyPagePostList = () => {
    const [postData, setPostData] = useState([])
    const { author, avatar } = useUser()
    console.log(postData, 'postData')
    useEffect(() => {
        fetch(url + `/getMyPosts?author=${author}`)
            .then(res => res.json())
            .then(data => {
                let copy = Object.assign([], data);
                copy.sort((a, b) => b.date - a.date);
                setPostData(copy)
            })
    }, [])

    return (
        <>
            {
                postData?.map(it => {
                    return (
                        <Post key={it.date} it={it} />
                    )
                })
            }
        </>
    );
};

export default MyPagePostList;