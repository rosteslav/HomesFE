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
                        containerStyle={{ margin: '8px' }}
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
                                padding: '16px 24px',
                                backgroundColor: 'var(--color-grey-0)',
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
