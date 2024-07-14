import {React, useContext, useState} from 'react'
import { Button, ButtonGroup, Card as CharkraCard, CardBody, CardFooter, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import CustomizeModal from './CustomizeModal';
import { getMenuItemCustomizations, updateCart } from '../utils/CartUtil';
import { CartContext } from '../App';

const Card = ({menuItem}) => {
  const { cart, setCart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const showCustomizeBtn = menuItem.menutItemConfigs.length > 0;

  /**
   * opens the customization modal
   */
  const onCustomize = (item) => { 
    setIsOpen(true);
  }
  /**
   * Close the customization modal
   */
  const onClose = () => {
    setIsOpen(false);
  }

  /**
   * Adds the item to the cart
   */
  const onAdd = (item) => {
    const defaultCustomization = getMenuItemCustomizations(item.menutItemConfigs);
    const itemToAdd = {
      name: menuItem.name,
      price: menuItem.initialPrice,
      count: 1, 
      details: defaultCustomization
    };
    setCart(updateCart(cart, itemToAdd));
  }
  
  return (
   <>
    <CharkraCard minW="285px" type="outline">
      <CardBody>
        <Flex w="100%" direction="column" alignItems="center">
          <Image
            objectFit="cover"
            h="450px"
            w="100%"
            minW="250px"
            src={menuItem.photoUrl}
            alt={menuItem.alt}
            borderRadius='lg'
          />
          <Stack mt='6' spacing='3' alignSelf="flex-start">
            <Heading size='md'>{menuItem.name}</Heading>
            <Text>
              {menuItem.description}
            </Text>
            <Text color='blue.600' fontSize='2xl'>
              ${menuItem.initialPrice}
            </Text>
          </Stack>
        </Flex>
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button 
            variant='solid' 
            colorScheme='blue'
            onClick={() => onAdd(menuItem)}>
            Add to Cart
          </Button>
          { showCustomizeBtn &&
            <Button 
              variant='ghost' 
              colorScheme='blue' 
              onClick={() => onCustomize(menuItem)}>
              Customize
            </Button>
          }
        </ButtonGroup>
      </CardFooter>
    </CharkraCard>
    <CustomizeModal isOpen={isOpen} onClose={onClose} menuItem={menuItem} />

   </>
  )
}

export default Card