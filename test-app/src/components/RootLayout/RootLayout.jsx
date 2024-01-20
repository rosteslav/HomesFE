import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Components
import Header from './Header';

const RootLayout = () => {
    const location = useLocation();
    const lowercasePathname = location.pathname.toLowerCase();

    return (
        <>
            <Header />
            <main
                className={` ${
                    lowercasePathname.includes('/dashboard') ? '' : 'm-auto max-w-screen-2xl flex-1'
                } `}
            >
                <>
                    <Toaster
                        position='top-center'
                        gutter={12}
                        containerStyle={{ margin: '30px' }}
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
