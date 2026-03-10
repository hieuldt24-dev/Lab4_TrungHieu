import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header(){

 const user = useSelector(state=>state.auth.user)
 const dispatch = useDispatch()
 const navigate = useNavigate()

 const handleLogout=()=>{
  dispatch(logout())
  navigate("/login")
 }

 return(

 <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">

  <div className="container-fluid px-3">
   
   <a className="navbar-brand" href="/home">
    {/* static assets placed in public/ are served from root */}
    <img src="/logo.png" alt="Logo" className="me-2" />
    <strong>PersonalBudget</strong>
   </a>

   <div className="ms-auto d-flex align-items-center gap-3">

    <span className="text-muted  me-3">
     Signed in as <b>{user?.fullName}</b>
    </span>

    <button
    className="btn btn-outline-danger btn-sm"
    onClick={handleLogout}
    >
     Logout
    </button>

   </div>

  </div>

 </nav>
 )
}

export default Header