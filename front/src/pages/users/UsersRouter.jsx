import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UsersLayout from './UsersLayout';
import Register from './Register';
import Login from './Login';
import ListUsers from './ListUsers';

const UsersRouter = () => {
    return (
        <Routes>
            <Route element={<UsersLayout />}>
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="all" element={<ListUsers />} />
            </Route>
        </Routes>
    );
};

export default UsersRouter;