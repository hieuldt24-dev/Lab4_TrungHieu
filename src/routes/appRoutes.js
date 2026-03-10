import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/loginPage";
import HomePage from "../pages/homePage";
import { useSelector } from "react-redux";

function ProtectedRoute({ element }) {
  const user = useSelector(state => state.auth.user);
  
  return user ? element : <Navigate to="/login" replace />;
}

function AppRoutes(){

 const user = useSelector(state => state.auth.user);

 return(
  <BrowserRouter>

    <Routes>

      <Route path="/" element={<Navigate to={user ? "/home" : "/login"} replace />} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/home" element={<ProtectedRoute element={<HomePage/>} />}/>

    </Routes>

  </BrowserRouter>
 )
}

export default AppRoutes