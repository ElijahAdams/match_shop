import React from 'react'
import { Box, Flex, Grid, Spacer } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom';

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
let activeStyle = ({ isActive }) => {return isActive ? 
  'navbar__active-link navbar__navlink': 
  'navbar__navlink'
};

const Navbar = () => {
  return (
    <>
      <Flex pl="10px" borderBottom="1px" color="black" w="100%" h="75px" alignItems="center" gap="2">
        <Flex h="100%" alignItems="center">
          <Box mr="20px">Logo</Box>
          <Flex h="100%" alignItems="center">
              <NavLink end to="/" className={(activeStyle)}>
                Discover Matcha
              </NavLink>
              <NavLink end to="/order" className={activeStyle}>
                Order
              </NavLink>
              <NavLink end to="/about" className={activeStyle}>
                About Us
              </NavLink>
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