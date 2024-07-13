import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Box } from '@chakra-ui/react'
const MainLayout = () => {
  return (
    <>
    <Navbar />
    <Box w="100%" mt="75px">
      <Outlet />
    </Box>
    </>
  )
}

export default MainLayout