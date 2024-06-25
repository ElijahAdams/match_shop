import React from 'react'
import { 
  Box,
  Button, 
  Flex, 
  Grid, 
  IconButton, 
  Menu,
  MenuButton, 
  MenuItem, 
  MenuList, 
  Spacer, 
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
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

const DesktopNav = () => {
  return (
    <>
      <Flex h="100%" alignItems="center">
        <Box mr="30px">
          <NavLink end to="/" >
              LOGO
          </NavLink>
        </Box>
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
          <Button>Sign Up</Button>
          <Button>Log In</Button>
        </Grid>
      </Flex>
    </>
  )
}

const MobileNav = () => {
  return (
    <>
      <Flex w="100%" alignItems="center">
        <Menu>
          <MenuButton     
            as={IconButton}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
            icon={<HamburgerIcon />}>
          </MenuButton>
          <MenuList>
            <MenuItem>            
              <NavLink end to="/" >
                  Discover Matcha
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink end to="/order" >
                Order
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink end to="/about">
                About Us
              </NavLink>
            </MenuItem>
          </MenuList>
        </Menu>
        <Spacer />
        <Box>          
          <NavLink end to="/" >
            LOGO
          </NavLink>
        </Box>
        <Spacer />
        <Box>test</Box>
      </Flex>
    </>
  )
}
const Navbar = () => {
  return (
    <>
    <Flex borderBottom="1px" w="100%" h="75px" pl="10px" pr="10px" color="black" alignItems="center">
      <Flex display={{base: "flex", md: "none"}} w="100%" >
        <MobileNav />
      </Flex>
      <Flex display={{ base: "none", md: "flex" }} w="100%" >
        <DesktopNav />
      </Flex>
    </Flex>
    </>
  )
} 

export default Navbar