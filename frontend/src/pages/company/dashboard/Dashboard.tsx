import Box from '@mui/material/Box'
import React from 'react'
import PrimarySearchAppBar from '../../../components/navbar/Navbar'
import { Sidebar } from '../../../components/sidebar-3/Sidebar'

function Dashboard() {
  return (
    <>
     <Box >
      {/* <Box sx={{position:'fixed'}}> */}
      <PrimarySearchAppBar />
      {/* </Box> */}
      <Box sx={{display:'flex'}}>
      <Box>

        <Sidebar locationName={'Dashboard'} />
      </Box>
        <Box sx={{flexGrow:'1'}}>
          </Box>
          </Box>
          </Box>
    </>
  )
}

export default Dashboard