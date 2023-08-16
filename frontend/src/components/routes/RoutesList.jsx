import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Error from '../Error404';
import { routes } from './routes';
import Layout from '../../layout/Layout';
import Registration from '../Registration/Registration';
import Authorization from '../Authorization';


const RoutesList = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/registration' element={<Registration />} />
                <Route path='/authorization' element={<Authorization />} />
                {routes.map(route => {
                    return (
                        <Route
                            exact
                            path={route.path}
                            key={`route ${route.path}`}
                            element={<Layout><route.component /></Layout>}
                        >
                        </Route>
                    )
                })}
                <Route path='*' element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesList;