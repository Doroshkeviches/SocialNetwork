import React, { useEffect, useState } from 'react';
import './style.sass'
import Post from './Post';
import { DateConverter } from '../../DateConverter';
import { url } from '../../../constants';

const PostList = () => {
    const [postData, setPostData] = useState([])
    useEffect(() => {
        fetch(url + '/getAllPosts')
            .then(res => res.json())
            .then(data => {
                let copy = Object.assign([], data);
                copy.sort((a, b) => b.date - a.date);
                setPostData(copy)
            })
    }, [])
    const data = [
        {
            avatar: 'https://sun23-2.userapi.com/s/v1/ig2/aLZuQ5C8UWuZflc9aUl_twFlk2dAlNAKOiFq-s_qkLF4o9EQTkdNBofWbFINXe_Oj2O25kjaI61aw57elXkCtP2x.jpg?size=50x50&quality=96&crop=0,299,1622,1622&ava=1',
            author: "Doroshkevich",
            date: DateConverter(),
            text: 'Пост 1 пост 1 пост 1',
            likes: [
                {
                    author: 'Dima',
                    avatar: ''
                },
                {
                    author: 'Dima',
                    avatar: ''
                },
                {
                    author: 'Dima',
                    avatar: ''
                },
            ],
            comments: [{
                author: 'Evg',
                avatar: 'https://sun23-2.userapi.com/s/v1/ig2/aLZuQ5C8UWuZflc9aUl_twFlk2dAlNAKOiFq-s_qkLF4o9EQTkdNBofWbFINXe_Oj2O25kjaI61aw57elXkCtP2x.jpg?size=50x50&quality=96&crop=0,299,1622,1622&ava=1',
                text: 'is simply dummy text of the printing and typesetting industry. Lorem',
                date: DateConverter(),
            }],
            image: ['https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Lion_d%27Afrique.jpg/220px-Lion_d%27Afrique.jpg'],
        },
        {
            avatar: 'https://sun23-2.userapi.com/s/v1/ig2/aLZuQ5C8UWuZflc9aUl_twFlk2dAlNAKOiFq-s_qkLF4o9EQTkdNBofWbFINXe_Oj2O25kjaI61aw57elXkCtP2x.jpg?size=50x50&quality=96&crop=0,299,1622,1622&ava=1',
            author: "Doroshkevich",
            date: DateConverter(),
            text: 'Пост 2 пост 2 пост 2',
            likes: [
                {
                    author: 'Dima',
                    avatar: ''
                },
                {
                    author: 'Dima',
                    avatar: ''
                },
                {
                    author: 'Dima',
                    avatar: ''
                },
            ],
            comments: [{
                author: 'Evg',
                avatar: 'https://sun23-2.userapi.com/s/v1/ig2/aLZuQ5C8UWuZflc9aUl_twFlk2dAlNAKOiFq-s_qkLF4o9EQTkdNBofWbFINXe_Oj2O25kjaI61aw57elXkCtP2x.jpg?size=50x50&quality=96&crop=0,299,1622,1622&ava=1',
                text: 'is simply dummy text of the printing and typesetting industry. Lorem is simply dummy text of the printing and typesetting industry. Lorem is simply dummy text of the printing and typesetting industry. Lorem',
                date: DateConverter(),
            }],
            image: ['https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Lion_d%27Afrique.jpg/220px-Lion_d%27Afrique.jpg'],
        },
    ]
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

export default PostList;