import { React, useContext, useState } from 'react'
import { FaCartShopping } from 'react-icons/fa6'
import { 
  Badge,
  Box,
  Button, 
  Collapse,
  Flex, 
  Grid, 
  Icon,
  IconButton, 
  Spacer, 
  useDisclosure
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { NavLink, useNavigate } from 'react-router-dom';
import { CartContext } from '../App';

const NAV_ITEMS = [
  {
    key: 'discover_matcha',
    label: 'Discover Matcha',
    href: '/'
  },
  {
    key: 'order',
    label: 'Order',
    href: '/order'
  },
  {
    key: 'about',
    label: 'About Us',
    href: '/about',
  },
]
let activeStyle = ({ isActive }) => {return isActive ? 
  'navbar__active-link navbar__navlink': 
  'navbar__navlink'
};

const DesktopNav = () => {
  const navigate = useNavigate();
  const {cart, setCart} = useContext(CartContext);
  const cartCount = cart.length;
  return (
    <>
      <Flex h="100%" alignItems="center">
        <Box mr="30px">
          <NavLink end to="/" >
              LOGO
          </NavLink>
        </Box>
        <Flex h="100%" alignItems="center">
          {NAV_ITEMS.map(navItem => (
            <NavLink to={navItem.href} key={navItem.key} className={(activeStyle)}>
              {navItem.label}
            </NavLink>
          ))}
        </Flex>
      </Flex>
      <Spacer />
      <Flex>
        <Grid templateColumns='repeat(3, 1fr)' gap={1}>
          <Button>Sign Up</Button>
          <Button>Log In</Button>
          <IconButton 
            className="badge"
            variant='ghost'
            colorScheme='blue'
            aria-label="Go to Cart"
            size="md"
            value={cartCount}
            icon={
              <Icon as={FaCartShopping} boxSize={6}/>
            }
            onClick={() => navigate("/cart")}/>
        </Grid>
      </Flex>
    </>
  )
}

const MobileNav = () => {
  const {isOpen, onToggle } = useDisclosure()
  return (
    <>
    {/* Mobile Nav header section */}
      <Flex w="100%" alignItems="center">
        <IconButton
            aria-label="Open Menu"
            size="lg"
            icon={
              <HamburgerIcon />
            }
            onClick={() => onToggle()}
          />
        <Spacer />
        <Box>          
          <NavLink end to="/" >
            LOGO
          </NavLink>
        </Box>
        <Spacer />
        <Box>test</Box>
      </Flex>

      {/* Mobile nav content */}
      <Collapse in={isOpen} >
        <Flex
          w="100%"
          bgColor="gray.50"
          zIndex={10}
          h="100vh"
          pos="fixed"
          top="0"
          left="0"
          overflowY="auto"
          flexDir="column"
        >
          <Flex pl="10px" pr="10px" pt="13.5px">
            <IconButton
              aria-label="close Menu"
              size="lg"
              icon={
                <CloseIcon />
              }
              onClick={() => onToggle()}
            />
          </Flex>
          <Flex flexDir="column" align="center">
            {NAV_ITEMS.map(navItem => (
              <Button
                key={navItem.key}
                className="navbar__navlink"
                variant="ghost"
                aria-label={navItem.label}
                w="100%"
                onClick={() => onToggle()}
              >
                <NavLink to={navItem.href} >
                  {navItem.label}
                </NavLink>
              </Button>
            ))}
          </Flex>
        </Flex>
      </Collapse>
    </>
  )
}

const Navbar = () => {
  return (
    <>
    <Flex borderBottom="1px" w="100%" h="75px" pl="10px" pr="10px" 
      color="black" alignItems="center" position="fixed" top="0" zIndex="1" background="white">
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
