import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import './style.sass'
const SearchInput = () => {
    return (
        <div className='search-input'>
                <SearchIcon style={{
                    color: '#999999',
                }} />
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='Поиск'
            />
        </div>
    );
};

export default SearchInput;