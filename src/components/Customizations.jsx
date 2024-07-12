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
import { getMenuItemCustomizations } from '../utils/MenuItemUtil';

const Customizations = ({menuItemConfigs, onCustomizationUpdate}) => {
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
   * componentType = toggle
   * componentDetails: {
   *   on: "yes"
   *   off: "no"
   * }
   */
  
  // Set Default Customization value
  const defaultCustomization =  getMenuItemCustomizations(menuItemConfigs);
  const [customizations, setCustomizations] = useState(defaultCustomization);

  /**
   * Handle changes on selector element. Specifically Switch elements
   * @param {*} target 
   */
  const handleChange = ({target}) => {
    // find the specific menu item config. 
    const menuItemConfig = menuItemConfigs.find(mIC => {
      return mIC.label === target.id;
    });
    // use the values correlating to on and off as as the value for the customization
    const value = target.checked ? menuItemConfig.componentDetails.on : menuItemConfig.componentDetails.off;
    setCustomizations(customizations => ({
      ...customizations,
      [target.id]: value
    }));
  }

  /**
   * Handle changes on selector elements for Slider & Radio group
   * @param {*} value 
   * @param {*} label 
   */
  const handleChangeDirectValue = (value, label) => {
    setCustomizations(customizations => { 
      return {
        ...customizations,
        [label]: value
      }
    });
  }

  useEffect(() => {
    onCustomizationUpdate(customizations);
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
                <span>{menuItemConfig.componentDetails.off}</span>
                <Switch id={menuItemConfig.label} size="md" onChange={handleChange}/>
                <span>{menuItemConfig.componentDetails.on}</span>
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
                  value={menuItemConfig.defaultValue}
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
                defaultValue={menuItemConfig.defaultValue} 
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