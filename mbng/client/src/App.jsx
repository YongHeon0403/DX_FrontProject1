import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import LoginForm from './pages/LoginForm';
import Register from './pages/Register';

import './css/new.css';
import './css/main.css';
import './css/header.css';


function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/LoginForm" element={<LoginForm />} />
                <Route path="/Register" element={<Register />} />
            </Routes>
            <Footer name="YONGHEON" />
        </Router>
    );
}

export default App;
