import React, { useState } from 'react';
import { Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons'
const UploadItem = ({ filelist, setFilelist }) => {
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
    }
    const onRemove = (file) => {
        const newFilelist = filelist.filter((it) => it.uid !== file.uid)
        setFilelist(newFilelist)
    }
    const handleChange = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        setFilelist([...info.fileList])

    }


    return (
        <>
            <Upload
                name="avatar"
                listType="text"
                className="avatar-uploader"
                showUploadList={true}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
                onRemove={(file) => onRemove(file)}
                fileList={filelist}
                multiple
            >
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
        </>
    );
};

export default UploadItem;