import { Box } from "@mui/material";
import React, { useState } from "react";
import PrimarySearchAppBar from "../../../components/navbar/Navbar";
import PreLoader from "../../../components/PreLoader/PreLoader";
import { Sidebar } from "../../../components/sidebar-3/Sidebar";
import StickyHeaderTable from "../../../components/table/StickyHeaderTable";
// import Sidebar from '../../../components/sidebar/Sidebar';

function CompanyDashboard() {
  
  return (

    <Box >
    {/* <Box sx={{position:'fixed'}}> */}
    <PrimarySearchAppBar />
    {/* </Box> */}
    <Box sx={{display:'flex'}}>
    <Box>

      <Sidebar locationName="Clients" />
    </Box>
      <Box sx={{flexGrow:'1'}}>
    <Box sx={{marginTop: '185px',marginRight: '5%',marginLeft: '22%',fontSize:'16px'}}>
     
          <StickyHeaderTable />
         
    </Box>
    </Box></Box></Box>
  );
}

export default CompanyDashboard;
