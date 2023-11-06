import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

import styles from "./Header.module.css";

export const Header = () => {
    const { user, removeUser } = useContext(AuthContext);
    const setActiveClass = ({ isActive }) => isActive ? styles.active : "";

    return (
        <header>
            <nav className={styles.topNav}>
                <ul>
                    {user
                        ? <>
                            <li><NavLink to={"/"} className={setActiveClass}>Items</NavLink></li>
                            {user.isAdmin && <li><NavLink to={'/register-admin'} className={setActiveClass}>Register Admin</NavLink></li>}
                            <li><Link to={'/'} onClick={removeUser}>Logout</Link></li>
                        </>
                        : <>
                            <li><NavLink to={'/login'} className={setActiveClass}>Login</NavLink></li>
                            <li><NavLink to={'/register'} className={setActiveClass}>Register</NavLink></li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    );
};