import React, { useState } from 'react';
import './style.sass'
import myPhoto from '../../assets/myPhoto.jpg'
import { Image, Button } from 'antd';
const CV = () => {
    const [visible, setVisible] = useState(false);
    return (
        <div className='cv'>

            <div className='cv-creater'>Created by: Doroshkeviches </div>
            <div className='cv-creater'>tg <a className='link' href="https://t.me/Doroshkeviches">@Doroshkeviches</a> </div>
            <div className='cv-creater'>LinkedIn: <a className='link' href="https://www.linkedin.com/in/evgeniy-doroshkevich-aa29b3252/">LinkedIn profile</a> </div>
            <div className='cv-creater'>Email: <a className='link' href="mailto:Doroshkeviches@yandex.ru">Email</a></div>

            <div className='cv-creater-button'>
                <Button type="primary" onClick={() => setVisible(true)}>
                    photo
                </Button>
                <Image
                    preview={{
                        visible,
                        src: myPhoto,
                        onVisibleChange: (value) => {
                            setVisible(value);
                        },
                    }}
                    alt="" />

            </div>

        </div>
    );
};

export default CV;