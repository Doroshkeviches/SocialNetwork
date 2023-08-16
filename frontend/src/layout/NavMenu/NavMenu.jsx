import React from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import './style.sass'
import { data } from './data';
import { Link } from 'react-router-dom'
const NavMenu = () => {
    return (
        <>
            <MenuList>
                {data.map(it => {
                    return (
                        <Link to={it.path}>
                            <MenuItem key={it.title}>
                                <ListItemIcon>
                                    {it.icon}
                                </ListItemIcon>
                                <Typography noWrap className='menu-item-title' variant="inherit" >{it.title}</Typography>
                            </MenuItem>
                        </Link>
                    )
                })}
            </MenuList>
        </>
    );
};

export default NavMenu;