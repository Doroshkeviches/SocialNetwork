import React from 'react';
import './style.sass'
import { DateConverter } from '../DateConverter';
const MyMessage = ({ it }) => {
    const { message, date, author, avatar } = it
    return (
        <div className='message my-message'>
            <img className='message-avatar' src={avatar} alt="" />
            <div className="message-main my-message-main">
                <div className="message-main-author">
                    {author}
                </div>
                <div className="message-main-text">
                    {message}
                </div>
                <div className='message-main-date'>
                    {DateConverter(date)}
                </div>
            </div>
        </div>
    );
};

export default MyMessage;

