import { React, useCallback, useContext } from 'react'
import { CartContext } from '../App';
import { 
  Box, 
  Button,
  Card, 
  CardBody, 
  Fade, 
  Flex,
  Heading, 
  HStack, 
  Icon, 
  IconButton, 
  Image, Stack, Text } from '@chakra-ui/react';
import { FaTrash } from "react-icons/fa";
import { deleteItem, updateCartItem } from '../utils/CartUtil';
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const env = import.meta.env;
const stripePromise = loadStripe(env.VITE_STRIPE_API_KEY);

const Cart = () => {
  const {cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const fetchClientSecret = useCallback(() => {
    // lineItems
    const lineItems =  cart.map(cartItem => {
      return {price: cartItem.priceId, quantity: cartItem.count}
    });

    // Create a Checkout Session
    return fetch("/api/create-checkout-session", {
        method: "POST",
        body: JSON.stringify({lineItems}),
        headers: {
          "Content-Type": "application/json",
        }
    }).then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);
  const options = {
    fetchClientSecret,
  };

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
    <Fade in={true} transition={{enter: { duration: 1.5 }}}>
      { !cart.length ? 
        <Flex justifyContent="center">
          <Button onClick={() => navigate("/order")}>Add to Order</Button></Flex>:
        <Flex pl="30px" pr="30px" flexDirection={{base: "column-reverse", md: "row"}}>
          <Box w={{base: "100%", md: "50%"}}>
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={options}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
          </Box>
          <Box w={{base: "100%", md: "50%"}}>
            {cart.map((c, index) => (
              <Card
                mb="15px"
                key={c.name + index}
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
          </Box>
        </Flex>
      }
    </Fade>
    </>
  )
}

export default Cart