import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import { HomePage } from "./pages/HomePage";
import { LoginPage } from './pages/LoginPage';

import './App.css';

export const App = () => {
    return (
        <div className="App">
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/login' element={<LoginPage />} />
                </Routes>
            </AuthProvider>
        </div>
    );
};
