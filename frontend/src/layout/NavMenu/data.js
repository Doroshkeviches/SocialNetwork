import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FeedIcon from '@mui/icons-material/Feed';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
export const data = [
    {
        icon: <AccountCircleOutlinedIcon />,
        title: 'Моя страница',
        path: '/myPage'
    },
    {
        icon: <FeedIcon />,
        title: 'Новости',
        path: "/"
    },
    {
        icon: <MailOutlineOutlinedIcon />,
        title: 'Мессенджер',
        path: "/messages"
    },
    {
        icon: <GroupOutlinedIcon />,
        title: 'Друзья',
        path: "/friends"
    },
    {
        icon: <CameraAltOutlinedIcon />,
        title: 'Фотографии',
        path: "/photos"
    },
    {
        icon: <SportsEsportsOutlinedIcon />,
        title: 'Игры',
        path: "/games"
    },
]