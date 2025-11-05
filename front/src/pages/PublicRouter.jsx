import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import HomeLayout from './HomeLayout';

const PublicRouter = () => {
    return (
        <Routes>
            <Route element={<HomeLayout/>}>
                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
    );
};

export default PublicRouter;