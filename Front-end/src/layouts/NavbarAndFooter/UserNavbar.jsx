import { Link, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserNavbar = () => {
    let navigate = useNavigate();

    const userLogout = () => {
        toast.success("Logged out!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        sessionStorage.removeItem("active-user");
        window.location.reload(true);
    };

    return (
        <div className='collapse navbar-collapse'>
            <div className='ms-auto'>
                <ul className='navbar-nav'>
                    <li className='nav-item me-auto'>
                        <NavLink className='nav-link' to='/shelf'>Shelf</NavLink>
                    </li>
                    <li class="nav-item">
                        <Link to="" class="nav-link active" aria-current="page" onClick={userLogout}>
                            <a type='button' className='btn btn-outline-light'>Log-out</a>
                        </Link>
                        <ToastContainer />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default UserNavbar;
