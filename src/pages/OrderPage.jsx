import React, { useEffect, useState } from 'react'
import { CircularProgress, Fade, Flex, SimpleGrid } from '@chakra-ui/react';
import Card from '../components/Card'
const OrderPage = () => {
const [menuItems, setMenuItems] = useState([]);
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  setIsLoading(true);
  const fetchMenuItems = async () => {
    try {
      const url = '/api/menuItems';
      const res = await fetch(url);
      const data = await res.json();
      setMenuItems(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }
  fetchMenuItems();
}, []);

  return (
    <>
    
    {isLoading ? 
      <Flex w="100%" h="100vh" justifyContent="center" mt="30px">
        <CircularProgress isIndeterminate color='green.300' />
      </Flex> : 
      (<div>
        <SimpleGrid pl="30px" pr="30px" spacing="15px" minChildWidth={{sm: "300px", md: "400px"}}>
          {menuItems.map((menuItem) => (
            <Fade key={menuItem.productId} in={!isLoading} transition={{enter: { duration: 1.5 }}}>
              <Card menuItem={menuItem}/>
            </Fade>
          ))}
          
        </SimpleGrid>
      </div>)
    }
    </>
  )
}

export default OrderPage