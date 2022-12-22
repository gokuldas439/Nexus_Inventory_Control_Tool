import { Box } from "@mui/material"

import PrimarySearchAppBar from "../../../components/navbar/Navbar"
import { Sidebar } from "../../../components/sidebar-3/Sidebar"
import ProductTable from "../../../components/table/productTable/ProductTable"



function Products() {

 


  return (
    <Box >
    {/* <Box sx={{position:'fixed'}}> */}
    <PrimarySearchAppBar />
    {/* </Box> */}
    <Box sx={{display:'flex'}}>
    <Box>

      <Sidebar locationName="Products" />
    </Box>
    <Box sx={{flexGrow:'1'}}>

        <Box sx={{marginTop: '185px',marginRight: '5%',marginLeft: '22%',fontSize:'16px'}}>
     
               <ProductTable />
               
          </Box>
         
    </Box>
    </Box>
    </Box>
  )
}

export default Products