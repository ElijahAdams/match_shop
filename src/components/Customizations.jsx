import {React, useEffect, useState} from 'react'
import {
  Flex,
  RadioGroup,
  Radio,
  Slider,
  SliderTrack,
  SliderFilledTrack, 
  SliderThumb,
  SliderMark,
  Stack,
  Switch,
  Spacer
} from '@chakra-ui/react'
const Customizations = ({menuItemConfigs}) => {
  /**
   * Check the type of menu item. menuItemConfigs[].componentType
   * Based on componentType show that particular component. 
   * Different components have different component details that are specific to the component type. 
   */

  /**
   * componentType = slider
   * componentDetails: {
   *   options: []
   * }
   */

  /**
   * componentType = radio
   * componentDetails: {
   *   options: []
   * }
   */

  /**
   * componentType = radio
   * componentDetails: {
   *   on: ""
   *   off: ""
   * }
   */
  const [customizations, setCustomizations] = useState({});
  // // TODO: set default states based on menuItemConfigs

  const handleChange = ({target}) => {
    setCustomizations(customizations => ({
      ...customizations,
      [target.id]: target.value
    }));
  }

  const handleChangeDirectValue = (value, label) => {
    setCustomizations(customizations => { 
      return {
        ...customizations,
        [label]: value
      }
    });
  }

  useEffect(() => {
    // TODO: return customizations to parent component
    console.log(customizations);
  }, [customizations]);
  
  return (
    <>
      {menuItemConfigs.map(menuItemConfig => (
        <Stack key={menuItemConfig.label}>
          <Spacer />  
          { menuItemConfig.componentType === "toggle" && 
            <>
              <h3>{menuItemConfig.label}</h3>
              <Flex gap="2">
                <span>hot</span>
                <Switch id={menuItemConfig.label} size="md" onChange={handleChange}/>
                <span>cold</span>
              </Flex>
            </>
          } 
          <Spacer />  
          { menuItemConfig.componentType === "slider" && 
            <>
              <h3>{menuItemConfig.label}</h3>
              <Slider id={menuItemConfig.label} aria-label="slider-ex-6" onChange={(value) => handleChangeDirectValue(value, menuItemConfig.label)}>
                <SliderMark value={25} >
                  25%
                </SliderMark>
                <SliderMark value={50} >
                  50%
                </SliderMark>
                <SliderMark value={75}>
                  75%
                </SliderMark>
                <SliderMark
                  value="50"
                  textAlign="center"
                  bg="blue.500"
                  color="white"
                  mt="-10"
                  ml="-5"
                  w="12"
                >
                  {customizations[menuItemConfig.label]}%
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </>
          }   
          <Spacer />  
          { menuItemConfig.componentType === "radio" && 
            <>
              <h3>{menuItemConfig.label}</h3>
              <RadioGroup 
                id={menuItemConfig.label} 
                defaultValue={menuItemConfig.componentDetails.options[0]} 
                onChange={(value) => handleChangeDirectValue(value, menuItemConfig.label)}>
                <Stack direction="row">
                  {menuItemConfig.componentDetails.options.map(option => (
                    <Radio key={option} value={option}>{option}</Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </>
          }
        </Stack>
      ))}
    </>
  )
}

export default Customizations