import Box from "@mui/material/Box"
import PrimarySearchAppBar from "../../../components/navbar/Navbar"
import { Sidebar } from "../../../components/sidebar-3/Sidebar"
import StickyHeaderTable from "../../../components/table/StickyHeaderTable"

function Clients() {
  return (
   <>
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
        <Box sx={{marginTop: '185px',marginRight: '10%',marginLeft: '8%',fontSize:'16px'}}>
     
     <StickyHeaderTable />
    
</Box>        {/* </Routes> */}
        </Box>
      </Box>
     </Box>
   </>
  )
}

export default Clients