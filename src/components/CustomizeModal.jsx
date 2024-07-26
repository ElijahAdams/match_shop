import { React, useContext, useState } from 'react'
import {
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text
} from '@chakra-ui/react'
import Customizations from './Customizations'
import { CartContext } from '../App'
import { updateCart } from '../utils/CartUtil'

const CustomizeModal = ({isOpen, onClose, menuItem}) => {
  const [customizations, setCustomizations] = useState({});
  const {cart, setCart} = useContext(CartContext);

  const onCustomizationUpdate = (c) => {
    setCustomizations(c);
  }

  const addToCart = () => {
    const itemToAdd = {
      productId: menuItem.productId,
      name: menuItem.product.name,
      photoUrl: menuItem.product.images[0],
      alt: menuItem.alt,
      price: menuItem.product.default_price.substr(0, 10),
      count: 1,
      details: customizations
    }
    setCart(updateCart(cart, itemToAdd));
    onClose();
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={["full", "lg"]} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Customize {menuItem.product.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              objectFit="cover"
              h={["250px","350px"]}
              w="100%"
              src={menuItem.product.images[0]}
              alt={menuItem.alt}
              borderRadius='lg'
            />
            <Text color='blue.600' fontSize='2xl'>
              ${menuItem.product.default_price.substr(0, 10)}
            </Text>
            <Customizations menuItemConfigs={menuItem.menutItemConfigs} onCustomizationUpdate={onCustomizationUpdate}/>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={addToCart} >
              Add to Cart
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CustomizeModal