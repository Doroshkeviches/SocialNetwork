import React, { useEffect, useState } from 'react';
import './style.sass'
import useUser from '../../../hooks/useUser'
import { Button, Upload, message } from 'antd'
import { Input } from 'antd';
import UploadItem from './Upload';
import Post from '../Post';
import { DateConverter } from '../../../DateConverter';
import { url } from '../../../../constants';
const { TextArea } = Input;
const AddNewPost = () => {
    const { avatar, author } = useUser()
    const [isOpen, setIsOpen] = useState(false)
    const [text, setText] = useState()
    const [fileList, setFileList] = useState([])
    const [urlList, setUrlList] = useState([])
    const [postList, setPostList] = useState([])

    useEffect(() => {
        const getBase64 = (img, callback) => {
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.addEventListener('load', () => callback(reader.result));
        };
        // setUrlList([])

        fileList.map((item) => {
            getBase64(item.originFileObj, (url) => {
                setUrlList(prev => [...prev, url])
            });
        })

    }, [fileList])


    function handleButtonAddPost() {
        const uniqueSet = new Set(urlList);
        const uniqueArr = Array.from(uniqueSet) //КОСТЫЛЬ  тк я не смог решить проблему двойной ссылки в urlLinks
        setPostList(prev => [...prev, {
            avatar,
            author,
            text,
            image: uniqueArr,
            likes: [],
            comments: [],
            date: Date.now()
        }])
        setPostList((prev) => prev.sort((a, b) => b.date - a.date))


        fetch(url + '/addNewPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                avatar,
                author,
                text,
                image: uniqueArr
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })

        // TODO post-запрос на сохранение поста

        //Очистка инпутов
        setText('')
        setFileList([])
        setUrlList([])
    }
    const onBlur = (e) => {
        if (e.relatedTarget?.tagName === "BUTTON") {
            console.log('btn')
        } else {
            setIsOpen(false)
        }
    }
    return (
        <>
            <div className='new-post'>
                <div className='new-post-main'>
                    <img className='new-post-main-avatar' src={avatar} alt="" />
                    <TextArea
                        onPressEnter={handleButtonAddPost}
                        style={{
                            width: '100%',
                        }}
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value)
                        }}
                        placeholder='Что у вас нового?'
                        rows={isOpen ? 5 : 2}
                        onFocus={() => setIsOpen(true)}
                        onBlur={(e) => {
                            onBlur(e)
                        }
                        } />
                </div>
                <div className='new-post-upload'>
                    <UploadItem filelist={fileList} setFilelist={setFileList} />
                    <Button onClick={handleButtonAddPost} type="primary">Создать пост</Button>
                </div>
            </div>
            {postList.map((it) => {
                return (
                    <Post key={Math.random()} it={it} />
                )
            })}
        </>
    );
};

export default AddNewPost;