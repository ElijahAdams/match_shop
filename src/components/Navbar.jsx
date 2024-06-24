import React from 'react'
import { Box, Flex, Grid, Spacer } from '@chakra-ui/react'

const NAV_ITEMS = [
  {
    label: 'Discover Matcha',
    href: '#'
  },
  {
    label: 'Order',
    href: '#'
  },
  {
    label: 'About',
    href: '#',
  },
]

const Navbar = () => {
  return (
    <>
      <Flex p="10px" borderBottom="1px" color="black" w="100%" h="75px" alignItems="center" gap="2">
        <Flex>
          <Box mr="20px">Logo</Box>
          <Flex >
            <Box mr="10px">Discover Matcha</Box>
            <Box mr="10px">Our Menu</Box>
            <Box mr="10px">About Us</Box>
          </Flex>
        </Flex>
        <Spacer />
        <Flex>
        <Grid templateColumns='repeat(2, 1fr)' gap={1}>
            <Box>Sign Up</Box>
            <Box>Log In</Box>
          </Grid>
        </Flex>

      </Flex>
    </>
  )
} 

export default Navbar