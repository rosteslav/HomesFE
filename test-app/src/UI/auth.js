import { redirect } from 'react-router-dom';

export const restrictLoginRegister = async () => {
    const user = JSON.parse(localStorage.getItem('authToken'));
    if (user) {
        return redirect('/');
    }

    return null;
};
