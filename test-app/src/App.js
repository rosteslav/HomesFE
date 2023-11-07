import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header/Header';

import { HomePage } from './pages/HomePage/HomePage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { RegisterAdminPage } from './pages/RegisterPage/RegisterAdminPage';

import styles from './App.module.css';

export const App = () => {
    return (
        <AuthProvider>
            <Header />
            <div className={styles.container}>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/register-admin' element={<RegisterAdminPage />} />
                </Routes>
            </div>
        </AuthProvider>
    );
};
