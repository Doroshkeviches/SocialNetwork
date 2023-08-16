import React, { useEffect, useState } from 'react';
import './style.sass'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; //outlined like icon
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'; //field like icon
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Comment from './Comment/Comment';
import { DateConverter } from '../../DateConverter';
import useUser from '../../hooks/useUser';
import { url } from '../../../constants';
import SendComment from './Comment/SendComment';

const Post = ({ it }) => {
    const [isLiked, setIsLiked] = useState(false)
    const [likes, setLikes] = useState(it.likes)
    const { avatar, author } = useUser()
    const [comments, setComments] = useState(it.comments)
    const [isCommentsShow, setIsCommentsShow] = useState(false)

    useEffect(() => {
        if (likes?.some(e => e.author === author)) {
            console.log("includes")
            setIsLiked(true)
        }
        setComments(prev => prev.sort((a, b) => b.date - a.date))
    }, [])
    function likePost() {
        if (isLiked) {
            setLikes(prev => prev.filter(item => item.author !== author))
            fetch(url + '/decreasePostLike', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    avatar,
                    author,
                    _id: it._id
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
        } else {
            setLikes(prev => [...prev, {
                author, avatar
            }])
            fetch(url + '/increasePostLike', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    avatar,
                    author,
                    _id: it._id
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
        }
    }

    return (
        <>
            <div className='post'>
                <div className='post-header'>
                    <img className='post-header-avatar' src={it.avatar} alt="" />
                    <div className='post-header-author'>
                        <div className="post-header-author-name">
                            {it.author}
                        </div>
                        <div className="post-header-author-date">
                            {DateConverter(it.date)}
                        </div>
                    </div>

                </div>
                <div className='post-main'>
                    <div className="post-main-text">
                        {it.text}
                    </div>
                    {it.image?.map((item) => {
                        return (
                            <img className="post-main-image" src={item} alt="" />
                        )
                    })}
                </div>
                <div className="post-footer">
                    <div className="post-footer-icon" onClick={() => {
                        likePost()
                        setIsLiked(prev => !prev)
                    }}>
                        {isLiked ?
                            <FavoriteRoundedIcon style={{
                                width: 20,
                                color: '#FF3347',
                                marginRight: 3
                            }} />
                            :
                            <FavoriteBorderIcon style={{
                                width: 20,
                                color: '#999999',
                                marginRight: 3
                            }} />}
                        {likes.length || 0}
                    </div>
                    <div className="post-footer-icon"
                        onClick={() => setIsCommentsShow(prev => !prev)}
                    >
                        <ChatBubbleOutlineOutlinedIcon style={{
                            width: 20,
                            color: '#999999',
                            marginRight: 3
                        }} />
                        {comments.length}
                    </div>
                </div>
                <div className='post-footer-line'></div>
                <div className="post-comment-container">
                    <SendComment setComments={setComments} it={it} />
                    {isCommentsShow
                        ?
                        comments?.map(item => {
                            return (
                                <Comment key={Math.random()} item={item} />
                            )
                        })
                        :
                        <Comment key={Math.random()} item={comments?.[0]} />
                    }


                </div>
            </div>
        </>
    );
};

export default Post;

