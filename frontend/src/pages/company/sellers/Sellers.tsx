import { Box } from "@mui/material"
import PrimarySearchAppBar from "../../../components/navbar/Navbar"
import { Sidebar } from "../../../components/sidebar-3/Sidebar"
import SellerTable from "../../../components/table/sellerTable/SellerTable"
import CompanyDashboard from "../tool/CompanyDashboard"

function Sellers() {
  return (
    <Box >
    {/* <Box sx={{position:'fixed'}}> */}
    <PrimarySearchAppBar />
    {/* </Box> */}
    <Box sx={{display:'flex'}}>
    <Box>

      <Sidebar locationName="Suppliers" />
    </Box>
    <Box sx={{flexGrow:'1'}}>

        <Box sx={{marginTop: '185px',marginRight: '5%',marginLeft: '22%',fontSize:'16px'}}>
     
          <SellerTable/>
          </Box>
         
    </Box>
    </Box>
    </Box>
        
  )
}

export default Sellers