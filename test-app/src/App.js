import { Route, Routes } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { LoginPage } from './components/LoginPage/LoginPage';
import { RegisterPage } from './components/RegisterPage/RegisterPage';
import { RegisterAdminPage } from './components/RegisterPage/RegisterAdminPage';

import styles from './App.module.css';
import { CatalogItems } from './components/CatalogItems/CatalogItems';

const App = () => {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <Routes>
                    <Route path="/" element={<CatalogItems />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/register-admin" element={<RegisterAdminPage />} />
                </Routes>
            </div>
        </>
    );
};

export default App;
