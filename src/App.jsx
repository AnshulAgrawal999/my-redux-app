import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { login, logout } from './redux/userSlice';
import CounterPage from './pages/CounterPage';
import AboutPage from './pages/AboutPage';

function App() {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const userDetails = useSelector((state) => state.user.userDetails);
    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(login({ name: 'John Doe', email: 'john.doe@example.com' }));
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Router>
            <nav>
                <Link to="/">Home</Link> | <Link to="/about">About</Link>
                {isAuthenticated ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <button onClick={handleLogin}>Login</button>
                )}
            </nav>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                {isAuthenticated && <p>Welcome, {userDetails?.name}</p>}
            </div>
            <Routes>
                <Route path="/" element={<CounterPage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </Router>
    );
}

export default App;
