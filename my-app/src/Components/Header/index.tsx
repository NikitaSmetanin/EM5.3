import { NavLink } from 'react-router';
import './style.css';

export const Header = () => {
    return (
        <header className="header">
            <NavLink to="/">Додати контакт</NavLink>
            <NavLink to="/contacts">Список контактів</NavLink>
        </header>
    );
};