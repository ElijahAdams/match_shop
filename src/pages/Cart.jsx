import { React, useContext } from 'react'
import { CartContext } from '../App';
import { Box, Button, Card, CardBody, CardFooter, Heading, HStack, Icon, IconButton, Image, Input, Stack, Text } from '@chakra-ui/react';
import { FaTrash } from "react-icons/fa";
import { updateCartItem } from '../utils/CartUtil';
const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  const handleChange = (event, c) => {
    c.count = parseInt(event.target.value);
    setCart(updateCartItem(cart, c));
  }
  return (
    <>
    {cart.map((c) => (
      <Card
        key={c.name}
        direction="row"
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: '125px', sm: '200px' }}
          src={c.photoUrl}
          alt={c.alt}
        />

        <Stack>
          <CardBody>
            <Heading size="md">{c.name}</Heading>
            <Text py="2" color="blue">
              ${c.price}
            </Text>
            <Box py="2">
              {Object.entries(c.details).map(([key, value]) => (  
                <Text key={c.name + key} mr="5px">{key} : {value}</Text>
              ))}
            </Box>
            <HStack maxW='320px'>
              {c.count === 1 ? 
                <IconButton 
                  variant='ghost'
                  colorScheme='red'
                  size="md"
                  icon={
                    <Icon as={FaTrash} boxSize={6}/>
                  }/> :
                <Button>-</Button>
              }
              
              <Input 
                w="60px"  
                value={c.count}
                onChange={() => {return} }/>
              <Button>+</Button>
            </HStack>
          </CardBody>
        </Stack>
      </Card>
    ))}
    </>
  )
}

export default Cart