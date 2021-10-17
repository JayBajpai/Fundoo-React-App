import './App.css';
import Login from './Pages/login/Login';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {ProtectedRoute} from '../src/services/auth/protectedRoutes';
import Registration from './Pages/registration/Registration';
import Dashboard from '../src/Pages/dashboard/Dashboard';
import ForgetPassword from '../src/Pages/ForgetPassword/ForgetPassword';
import ResetPassword from './Pages/ResetPassword/ResetPassword';


function App() {
  return (
    <BrowserRouter>
  
    <Switch>  
    <Route exact path="/" component={Login}/>
    <Route exact path="/Registration" component={Registration}/>
    <ProtectedRoute path={'/dashboard'} component={Dashboard}/>
    <Route path="/ForgetPassword" component={ForgetPassword}></Route>
    <Route path="/resetpassword" component={ResetPassword}></Route>
  
    </Switch>
    {/* <Login/> */}
 
    </BrowserRouter>
  );
}

export default App;
