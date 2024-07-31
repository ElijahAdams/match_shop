import { React, useCallback, useEffect, useContext, useState } from 'react'
import { CartContext } from '../App';
import StripeCheckout from '../components/StripeCheckout';
import { 
  Box, 
  Button,
  Card, 
  CardBody, 
  CircularProgress,
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
  Elements,
} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const env = import.meta.env;
const stripePromise = loadStripe(env.VITE_STRIPE_API_KEY);

const Cart = () => {
  const {cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    const items =  cart.map(cartItem => {
      return {id: cartItem.productId, count: cartItem.count}
    });
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
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
          <>
          { !clientSecret ? 
            <Flex w="100%" h="100vh" justifyContent="center" mt="30px">
              <CircularProgress isIndeterminate color='green.300' />
            </Flex> 
            :
            <Flex pl="30px" pr="30px" flexDirection={{base: "column", md: "row"}}>
              <Box w={{base: "100%", md: "50%"}} mr={{base:0, md: "20px"}}>
                <Elements options={options} stripe={stripePromise}>
                    <StripeCheckout />
                </Elements>
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
        </>
      }
    </Fade>
    </>
  )
}

export default Cart