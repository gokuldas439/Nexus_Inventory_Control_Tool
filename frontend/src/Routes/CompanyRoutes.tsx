import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import CompanyLogin from "../components/companyLogin/CompanyLogin";
import PrimarySearchAppBar from "../components/navbar/Navbar";
import { Sidebar } from "../components/sidebar-3/Sidebar";
import Dashboard from "../pages/company/dashboard/Dashboard";
import Sellers from "../pages/company/sellers/Sellers";
import CompanyDashboard from "../pages/company/tool/CompanyDashboard";

function CompanyRoutes() {
  return (
    <Box >
      {/* <Box sx={{position:'fixed'}}> */}
      <PrimarySearchAppBar />
      {/* </Box> */}
      <Box sx={{display:'flex'}}>
      <Box>

        <Sidebar />
      </Box>
        <Box sx={{flexGrow:'1'}}>
        {/* <Routes> */}
          <CompanyDashboard />
            {/* <Route path="/company/dashboard" element={<Dashboard />} />
            <Route path="/company/clients" element={<CompanyDashboard />} />
            <Route path="/company/suppliers" element={<Sellers />} />
        </Routes> */}
        </Box>
      </Box>
     </Box>
  );
}

export default CompanyRoutes;
