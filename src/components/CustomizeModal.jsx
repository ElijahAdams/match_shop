import React from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

const CustomizeModal = ({isOpen, onClose, menuItem}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Customize {menuItem.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            test
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button >Add to Cart</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CustomizeModal