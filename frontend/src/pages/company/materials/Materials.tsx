import { Box } from "@mui/material"
import PrimarySearchAppBar from "../../../components/navbar/Navbar"
import { Sidebar } from "../../../components/sidebar-3/Sidebar"
import MaterialTable from "../../../components/table/materialTable/MaterialTable"

function Materials() {
  return (
    <Box >
    {/* <Box sx={{position:'fixed'}}> */}
    <PrimarySearchAppBar />
    {/* </Box> */}
    <Box sx={{display:'flex'}}>
    <Box>

      <Sidebar locationName="Materials" />
    </Box>
    <Box sx={{flexGrow:'1'}}>

        <Box sx={{marginTop: '185px',marginRight: '5%',marginLeft: '22%',fontSize:'16px'}}>
     
               <MaterialTable/>
          </Box>
         
    </Box>
    </Box>
    </Box>  
    )
}

export default Materials