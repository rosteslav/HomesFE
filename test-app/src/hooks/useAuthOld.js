// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'universal-cookie';

// import { setUser, deleteUser, selectedUser } from '../store/slices/authSlice';
// import { errorMsg, selectedErrorMsg } from '../store/slices/errorMsgSlice';

// import { useFetch1 } from '../services/useFetch1';

// import { createUserContext } from '../util/createUserContext';

// export const useAuth = () => {
//     const dispatch = useDispatch();
//     const user = useSelector(selectedUser);
//     const errorInfo = useSelector(selectedErrorMsg);
//     const { login, register, adminRegister } = useFetch1();
//     const navigate = useNavigate();
//     const cookies = new Cookies();

//     const tokenKey = 'authToken';
//     if (!user) {
//         let token;
//         const credentials = JSON.parse(localStorage.getItem(tokenKey));

//         if (credentials) {
//             const expiration = new Date(credentials.token.expiration);
//             const currDate = new Date();

//             if (expiration > currDate) {
//                 token = credentials.token;
//             } else {
//                 localStorage.removeItem(tokenKey);
//             }
//         } else {
//             token = cookies.get(tokenKey);
//         }

//         if (token) {
//             const userContext = createUserContext(token);
//             dispatch(setUser(userContext));
//         }
//     }

//     //LOGIN
//     const onLoginSubmit = async (formData) => {
//         // if (formData.email === '' || formData.password === '') {
//         //     dispatch(
//         //         errorMsg({
//         //             text: 'All fealds are required!',
//         //             show: true,
//         //             className: {},
//         //             disableBtn: false
//         //         })
//         //     );
//         //     return;
//         // } else {
//             try {
//                 dispatch(
//                     errorMsg({
//                         text: '',
//                         show: false,
//                         className: {},
//                         disableBtn: true
//                     })
//                 );
//                 const credentials = await login(formData);
//                 const userContext = createUserContext(credentials.token);

//                 dispatch(setUser(userContext));

//                 localStorage.setItem(tokenKey, JSON.stringify(userContext));

//                 cookies.set(tokenKey, credentials.token, {
//                     expires: new Date(credentials.expiration),
//                     secure: true
//                 });
//                 navigate('/');
//                 return;
//             } catch (error) {
//                 dispatch(
//                     errorMsg({
//                         text: error.message,
//                         show: true,
//                         className: {},
//                         disableBtn: false
//                     })
//                 );
//             }
//         // }
//     };

//     // REGISTER
//     const onRegisterSubmit = async (formData) => {
//         if (formData.email === '' || formData.password === '') {
//             dispatch(
//                 errorMsg({
//                     text: 'All fealds are required!',
//                     show: true,
//                     className: {},
//                     disableBtn: false
//                 })
//             );
//             return;
//         }

//         try {
//             dispatch(
//                 errorMsg({
//                     text: '',
//                     show: false,
//                     className: {},
//                     disableBtn: true
//                 })
//             );
//             await register(formData);
//             onLoginSubmit(formData);
//         } catch (error) {
//             dispatch(
//                 errorMsg({
//                     text: error.message,
//                     show: true,
//                     className: {},
//                     disableBtn: false
//                 })
//             );
//         }
//     };

//     // REGISTER ADMIN
//     const onRegisterAdminSubmit = async (formData) => {
//         if (formData.email === '' || formData.password === '') {
//             dispatch(
//                 errorMsg({
//                     text: 'All fealds are required!',
//                     show: true,
//                     className: {},
//                     disableBtn: false
//                 })
//             );
//             return;
//         }

//         try {
//             dispatch(
//                 errorMsg({
//                     text: '',
//                     show: false,
//                     className: {},
//                     disableBtn: true
//                 })
//             );
//             await adminRegister(formData);
//             onLoginSubmit(formData);
//         } catch (error) {
//             dispatch(
//                 errorMsg({
//                     text: error.message,
//                     show: true,
//                     className: {},
//                     disableBtn: false
//                 })
//             );
//         }
//     };

//     //LOGOUT
//     const removeUser = () => {
//         dispatch(deleteUser(null));
//         dispatch(
//             errorMsg({
//                 text: '',
//                 show: false,
//                 className: {},
//                 disableBtn: false
//             })
//         );
//         localStorage.removeItem(tokenKey);
//         cookies.remove(tokenKey);
//     };

//     const auth = {
//         user,
//         errorInfo,
//         onLoginSubmit,
//         onRegisterSubmit,
//         onRegisterAdminSubmit,
//         removeUser
//     };

//     return auth;
// };
