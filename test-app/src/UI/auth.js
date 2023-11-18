import { redirect } from 'react-router-dom';

export const restrictLoginRegister = async () => {
    const user = JSON.parse(localStorage.getItem('authToken'));
    // console.log(user);
    if (user) {
        return redirect('/');
    }

    return null;
};
