import React from 'react';
import { Route, Routes } from 'react-router-dom';
import QuizHome from './QuizHome';
import QuizCreate from './QuizCreate';
import QuizLayout from './QuizLayout';

const QuizRouter = () => {
    return (
        <Routes>
            <Route element={<QuizLayout/>}>
                <Route path="/" element={<QuizHome />} />
                <Route path="new" element={<QuizCreate />} />
            </Route>
        </Routes>
    );
};

export default QuizRouter;