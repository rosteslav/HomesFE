import { Outlet } from 'react-router-dom';
import { Header } from './Header';

const RootLayout = () => {
    return (
        <>
            <Header />
            <main className='m-auto max-w-screen-2xl flex-1'>
                <Outlet />
            </main>
        </>
    );
};

export default RootLayout;
