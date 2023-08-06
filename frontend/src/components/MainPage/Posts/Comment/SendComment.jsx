import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons'
import useUser from '../../../hooks/useUser';
import { url } from '../../../../constants';
const SendComment = ({ it, setComments }) => {
    const [commentInput, setCommentInput] = useState('')
    const { author, avatar } = useUser()
    function handleButton() {
        if (commentInput.split(' ').join('')) {
            addCommentFetch()
            setComments(prev => [{
                avatar,
                author,
                text: commentInput,
                _id: it._id,
                date: Date.now()
            }, ...prev])
            setCommentInput('')
        }
    }
    function addCommentFetch() {
        fetch(url + '/addComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                avatar,
                author,
                text: commentInput,
                _id: it._id
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }
    return (
        <div className='post-comment-input'>
            <Input
                onPressEnter={handleButton}
                onChange={(e) => setCommentInput(e.target.value)}
                value={commentInput}
                placeholder="Оставьте комментарий"
                style={{
                    marginRight: 10
                }}
            />
            <Button
                onClick={handleButton}
                type="primary">
                <SendOutlined />
            </Button>

        </div>
    );
};

export default SendComment;