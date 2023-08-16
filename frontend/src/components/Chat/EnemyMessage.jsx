import React from 'react';
import { DateConverter } from '../DateConverter';

const EnemyMessage = ({ it }) => {
    const { message, date, author, avatar } = it
    return (
        <div className='message enemy-message'>
            <div className="message-main enemy-message-main">
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
            <img className='message-avatar' src={avatar} alt="" />
        </div>
    );
};

export default EnemyMessage;