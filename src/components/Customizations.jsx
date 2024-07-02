import React from 'react'
import {
  RadioGroup,
  Radio,
  Slider,
  SliderTrack,
  SliderFilledTrack, 
  SliderThumb,
  Stack,
  Switch
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

  return (
    <>
      {menuItemConfigs.map(menuItemConfig => (
        <Stack key={menuItemConfig.label}>


          { menuItemConfig.componentType === "toggle" && 
            <>
              <h3>{menuItemConfig.label}</h3>
              <Switch size='md' />
            </>
          }   
          { menuItemConfig.componentType === "slider" && 
            <>
              <h3>{menuItemConfig.label}</h3>
              <Slider aria-label='slider-ex-1' defaultValue={30}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </>
          }   
          { menuItemConfig.componentType === "radio" && 
            <>
              <h3>{menuItemConfig.label}</h3>
              <RadioGroup >
                <Stack direction='row'>
                  <Radio value='1'>First</Radio>
                  <Radio value='2'>Second</Radio>
                  <Radio value='3'>Third</Radio>
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