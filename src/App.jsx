import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { login, logout } from './redux/userSlice';

import CounterPage from './pages/CounterPage';

import AboutPage from './pages/AboutPage';

import PackagesList from './pages/PackagesList'  ;

import RollNumGen from './pages/RollNumGen'  ;

function App() {

    const isAuthenticated = useSelector( ( state ) => state.user.isAuthenticated )  ;

    const userDetails = useSelector( ( state ) => state.user.userDetails )  ;

    const dispatch = useDispatch()  ;

    const handleLogin = () => {

        // console.log( login( { name: 'John Doe' , email: 'john.doe@example.com' }) )  ;

        dispatch( login( { name: 'John Doe' , email: 'john.doe@example.com' } ) )  ;
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Router>

            <nav>

                {
                    isAuthenticated ? (
                        <button onClick={handleLogout}>Logout</button>
                        ) : (
                            <button onClick={handleLogin}>Login</button>
                        )
                }

                <Link to="/">Home</Link> | 
                <Link to="/about">About</Link>
                <Link to="/packages"> Packages </Link>
                
            </nav>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                {isAuthenticated && <p>Welcome, {userDetails?.name}</p>}
            </div>

            <Routes>

                <Route path="/" element={<CounterPage />} exact />
                <Route path="/about" element={<AboutPage />} exact />
                <Route path="/packages" element={<PackagesList />} exact />

                <Route path="/rollnogen" element={<RollNumGen />} exact />

            </Routes>

        </Router>
    );
}

export default App  ;
