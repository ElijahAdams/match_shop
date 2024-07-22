import { React, useContext } from 'react'
import { CartContext } from '../App';
import { 
  Box, 
  Button,
  Card, 
  CardBody, 
  CardFooter, 
  Heading, 
  HStack, 
  Icon, 
  IconButton, 
  Image, Stack, Text } from '@chakra-ui/react';
import { FaTrash } from "react-icons/fa";
import { deleteItem, updateCartItem } from '../utils/CartUtil';
const Cart = () => {
  const {cart, setCart } = useContext(CartContext);

  const incrementItemCount = (item) => {
      item.count = item.count + 1;
      setCart(updateCartItem(cart, item));
  }

  const decrementItemCount = (item) => {
    item.count = item.count - 1;
    setCart(updateCartItem(cart, item));
  }

  const deleteCartItem = (item) => {
    setCart(deleteItem(cart, item));
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
              { c.count === 1 ?
              <IconButton 
                  variant='ghost'
                  colorScheme='red'
                  size="md"
                  onClick={() => deleteCartItem(c)}
                  icon={
                    <Icon as={FaTrash} boxSize={6}/>
                }/> : 
                <Button onClick={() => decrementItemCount(c)}>-</Button>
              }
              <input className="countInput" value={c.count} readOnly onChange={() => {}}/>
              <Button onClick={() => incrementItemCount(c)} isDisabled={c.count >= 25}>+</Button>
            </HStack>
          </CardBody>
        </Stack>
      </Card>
    ))}
    </>
  )
}

export default Cart