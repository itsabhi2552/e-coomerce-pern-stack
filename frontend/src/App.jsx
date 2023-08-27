import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './containers/Login';
import Signup from './containers/Signup';
import VerifyEmail from './containers/VerifyEmail';
import VerifyEmailForgot from './containers/VerifyEmailForgot';
import Home from './containers/Home';
import MyCart from './containers/MyCart';
import Admin from "./containers/Admin";
import ShowAllProducts from "./containers/ShowAllProducts";
import ResetPassword from "./containers/ResetPassword";
import ForgotPassword from "./containers/ForgotPassword";
import MyOrder from "./containers/MyOrder";
import Orders from "./containers/Orders";
import Others from "./containers/Others";
import Logout from "./containers/Logout";
import { useEffect, useState } from "react";

function App() {
  const role = localStorage.getItem('role');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {}, [userRole]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/verifyEmail/:id" element={<VerifyEmail role={setUserRole} />}></Route>
          <Route exact path="/resetPassword" element={<ResetPassword role={setUserRole} />}></Route>
          <Route exact path="/logout" element={<Logout role={setUserRole} />}></Route>
          {
            role === 'admin' ?
              <>
                <Route exact path="/admin" element={<Admin role={setUserRole} />}></Route>
                <Route exact path="/showAllProduct" element={<ShowAllProducts role={setUserRole} />}></Route>
                <Route exact path="/Orders" element={<Orders role={setUserRole} />}></Route>
              </>
              :
              role === 'user' ?
                <>
                  <Route exact path="/home" element={<Home role={setUserRole} />}></Route>
                  <Route exact path="/myCart" element={<MyCart role={setUserRole} />}></Route>
                  <Route exact path="/myOrder" element={<MyOrder role={setUserRole} />}></Route>
                </>
                :
                <>
                  <Route exact path="/" element={<Login role={setUserRole} />}></Route>
                  <Route exact path="/signup" element={<Signup />}></Route>
                  <Route exact path="/forgotPassword" element={<ForgotPassword />}></Route>
                  <Route exact path="/verifyEmail/:token/:forgotPassword" element={<VerifyEmailForgot role={setUserRole} />}></Route>
                </>
          }
          <Route exact path="*" element={<Others />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
