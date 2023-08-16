import React from 'react';
import Grid from '@mui/material/Grid';
import './style.sass'
import NavMenu from './NavMenu/NavMenu';

import Header from './Header/Header';
import CV from './CV/CV';
const Layout = ({ children }) => {
    return (
        <div className='layout'>
            <Header />
            <div className='layout-main'>
                <Grid style={{
                    flexWrap: 'nowrap'
                }} container spacing={3} columns={18}>
                    <Grid style={{
                        minWidth: 190
                    }} item xs={3}>
                        <NavMenu />
                    </Grid>
                    <Grid item xs={10}>
                        <div className='main'>
                            {children}
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <div className='main'>
                            <CV />
                        </div>
                    </Grid>
                </Grid>
            </div>

        </div>

    );
};

export default Layout;