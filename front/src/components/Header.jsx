import React from 'react';

const Header = () => {
    return (
        <div>
            <h1>Test quiz</h1>
            <nav>
                <ul>
                    <li><a href="/quiz">Quiz</a></li>
                    <li><a href="/">Accueil</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;