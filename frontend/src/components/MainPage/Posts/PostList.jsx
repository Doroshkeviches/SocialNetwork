import React, { useEffect, useState } from 'react';
import './style.sass'
import Post from './Post';
import { url } from '../../../constants';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const PostList = () => {
    const [postData, setPostData] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [fetching, setFetching] = useState(true)
    const limits = 3
    useEffect(() => {
        console.log(fetching)
        if (fetching) {
            fetch(url + `/getAllPosts?limit=${limits}&page=${currentPage}`)
                .then(res => res.json())
                .then(data => {
                    setTotalCount(data.count)
                    setCurrentPage(prev => prev + 1)
                    const post = data.posts
                    setPostData(prev => [...prev, ...post])
                })
            .finally(() => setFetching(false))
        }
    }, [fetching])
    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [fetching])


    const scrollHandler = (e) => {
        if ((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 10) && postData.length < totalCount) {
            setFetching(true)
        }
    }

    return (
        <>
            {
                postData?.map(it => {
                    return (
                        <Post key={it.date} it={it} />
                    )
                })
            }
            {fetching ? <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center'
            }}>
                <Spin style={{
                    margin: '0 auto'
                }} indicator={<LoadingOutlined style={{ fontSize: 42 }} spin />} />
            </div> : null}
        </>
    );
};

export default PostList;