import MainPage from "../MainPage";
import Chat from "../Chat";
import MyPage from "../MyPage";
import Messenger from "../Messenger";

export const routes = [
    {
        path: '/myPage',
        component: MyPage
    },
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/messages',
        component: Messenger
    },
    {
        path: '/messages/:id',
        component: Chat
    },
]