import { React, useState } from 'react'
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
} from '@chakra-ui/react'
import Customizations from './Customizations'

const CustomizeModal = ({isOpen, onClose, menuItem}) => {
  const [customizations, setCustomizations] = useState({});
  const onCustomizationUpdate = (c) => {
    setCustomizations(c);
  }

  const addToCart = () => {
    console.log(customizations);
    onClose();
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={["full", "lg"]} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Customize {menuItem.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              objectFit="cover"
              h={["250px","350px"]}
              w="100%"
              src={menuItem.photoUrl}
              alt={menuItem.alt}
              borderRadius='lg'
            />
            <Customizations menuItemConfigs={menuItem.menutItemConfig} onCustomizationUpdate={onCustomizationUpdate}/>
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