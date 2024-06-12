import { NavLink } from 'react-router-dom';

const Register_Login_Header = () => {
    return (
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
            <div className='ms-auto'>
                <ul className='navbar-nav'>
                    <li className='nav-item m-1'>
                        <a type='button' className='btn btn-outline-light' href='/signup'>Sign Up</a>
                    </li>
                    <li className='nav-item m-1'>
                        <a type='button' className='btn btn-outline-light' href='/signin'>Sign In</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default Register_Login_Header;
