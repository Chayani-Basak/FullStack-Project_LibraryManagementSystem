import Navbar from "./NavbarAndFooter/Register_Login_Header";
import UserNavbar from "./NavbarAndFooter/UserNavbar";
import AdminNavbar from "./NavbarAndFooter/AdminNavbar";

const RoleNav=() => {
    const user=JSON.parse(sessionStorage.getItem("active-user"));
    const admin=JSON.parse(sessionStorage.getItem("active-admin"));
   
    if (user!=null) {
      return <UserNavbar />;
    } else if (admin!=null) {
      return <AdminNavbar />;
    } else {
      return <Navbar />;
    }
  };
   
  export default RoleNav;