import { NavLink } from 'react-router-dom';
import RoleNav from '../RoleNav';

const Navbar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
            <div className='container-fluid'>
                <span className='navbar-brand'>Bibliophiles' Bubble</span>
                <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/home'>Home</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/search'>Search Books</NavLink>
                        </li>
                    </ul>
                    <RoleNav />
                </div>
            </div>
        </nav>
    );
}
export default Navbar;