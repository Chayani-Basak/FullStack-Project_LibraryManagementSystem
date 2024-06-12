import { Link, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminNavbar = () => {
    let navigate = useNavigate();

    const user = JSON.parse(sessionStorage.getItem("active-admin"));
    console.log(user);

    const adminLogout = () => {
        toast.success("Logged out!!!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        sessionStorage.removeItem("active-admin");
        window.location.reload(true);
    };

    return (
         <div className='collapse navbar-collapse'> 
            <div className='ms-auto'>
                <ul className='navbar-nav me-auto'>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/admin'>Admin Activities</NavLink>
                    </li>
                    <li className="nav-item ms-auto">
                        <Link to="" class="nav-link active" aria-current="page" onClick={adminLogout}>
                            <a type='button' className='btn btn-outline-light'>Log-out</a>
                        </Link>
                        <ToastContainer />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdminNavbar;