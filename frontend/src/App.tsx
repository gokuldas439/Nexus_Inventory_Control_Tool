import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Login from "./pages/landingPage/login/Login";
import LandingPage from "./pages/landingPage/LandingPage";
import CompanyDashboard from "./pages/company/tool/CompanyDashboard";
import CompanyLoginPage from "./pages/company/login/CompanyLoginPage";
import UserLogin from "./pages/company/login/UserLogin";
import CompanyLogin from "./components/companyLogin/CompanyLogin";
import CompanyRoutes from "./Routes/CompanyRoutes";
import Dashboard from "./pages/company/dashboard/Dashboard";
import Sellers from "./pages/company/sellers/Sellers";
import Materials from "./pages/company/materials/Materials";
import Products from "./pages/company/products/Products";


// import { selectUserAuth } from "./redux/reducers/api/authSlice";

// type Props = {
//   component: JSX.Element;
// };

// function ProtectedRoute({ component }: Props) {
//   const { token } = useSelector(selectUserAuth);
//     if (!token) {
//       return <Navigate to="/login"/>;
//     }
//     else{

//       return component;
//     }
// }

function App() {
  interface props{
    role:"admin"
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
    
        <div className="container">
          {/* <Header /> */}
          
          <Routes>


            {/* <Route
              path="/"
              element={<ProtectedRoute component={<LandingPage />} />}
            /> */}


            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/login" element={<UserLogin />} /> */}
            <Route path="/company/login" element={<CompanyLogin />} />
            <Route path="/company/dashboard" element={<Dashboard />} />
            <Route path="/company/clients" element={<CompanyDashboard />} />
            <Route path="/company/suppliers" element={<Sellers />} />
            <Route path="/company/inventory/materials" element={<Materials />} />
            <Route path="/company/inventory/products" element={<Products />} />
            {/* <Route path='/register' element={} />
            <Route path='/admin/login' element={} />
            <Route path='/admin/home' element={} /> */}
          </Routes>
          {/* <CompanyRoutes/> */}
        </div>
      </Router>
    </>
  );
}

export default App;
