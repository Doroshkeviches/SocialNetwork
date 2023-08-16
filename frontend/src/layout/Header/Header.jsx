import React from 'react';
import { Link } from 'react-router-dom'
import SearchInput from '../SearchInput/SearchInput';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './style.sass'
import Logo from '../../components/icons/Logo';

const Header = () => {
    return (
        <div className='layout-header'>
            <div className='layout-header-left'>
                <Link className='layout-header-logo' to='/main'>
                    <Logo />
                </Link>
                <SearchInput />
            </div>
            <div className='layout-header-right'>
                <div className='layout-header-right-avatar'>
                    <img className='layout-header-right-avatar-image' src="https://sun23-2.userapi.com/s/v1/ig2/aLZuQ5C8UWuZflc9aUl_twFlk2dAlNAKOiFq-s_qkLF4o9EQTkdNBofWbFINXe_Oj2O25kjaI61aw57elXkCtP2x.jpg?size=50x50&quality=96&crop=0,299,1622,1622&ava=1" alt="" />
                    <ExpandMoreIcon style={{
                        color: "#999999"
                    }} />
                </div>

            </div>
        </div>
    );
};

export default Header;