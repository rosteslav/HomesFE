import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Toaster } from 'react-hot-toast';

const RootLayout = () => {
    return (
        <>
            <Header />
            <main className='m-auto max-w-screen-2xl flex-1'>
                <>
                    <Toaster
                        position='top-center'
                        gutter={12}
                        containerStyle={{ margin: '80px' }}
                        toastOptions={{
                            success: {
                                duration: 3000,
                            },
                            error: {
                                duration: 5000,
                            },
                            style: {
                                fontSize: '16px',
                                maxWidth: '500px',
                                margin: '10px',
                                padding: '16px 24px',
                                backgroundColor: 'white',
                                color: 'var(--color-grey-700)',
                            },
                        }}
                    />
                    <Outlet />
                </>
            </main>
        </>
    );
};

export default RootLayout;
