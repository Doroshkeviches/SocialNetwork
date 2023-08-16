import React from 'react';
import './style.sass'
import { DateConverter } from '../../../DateConverter';

const Comment = ({ item }) => {
    return item ?
        <div className="post-comment">
            <div className="post-comment-avatar-container">
                <img src={item?.avatar} className="post-comment-avatar" />
            </div>
            <div className="post-comment-main">
                <div className="post-comment-main-author">
                    {item?.author}
                </div>
                <div className="post-comment-main-text">
                    {item?.text}
                </div>
                <div className="post-comment-main-date">
                    {DateConverter(item?.date)}
                </div>
            </div>
        </div>
        :
        null
};

export default Comment;