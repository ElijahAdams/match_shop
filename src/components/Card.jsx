import React from 'react'
import { Button, ButtonGroup, Card as CharkraCard, CardBody, CardFooter, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';

const Card = ({menuItem}) => {
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
          <Button variant='solid' colorScheme='blue'>
            Add to Cart
          </Button>
          <Button variant='ghost' colorScheme='blue'>
            Customize
          </Button>
        </ButtonGroup>
      </CardFooter>
    </CharkraCard>
   </>
  )
}

export default Card