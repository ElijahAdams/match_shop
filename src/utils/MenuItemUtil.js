
/**
 * Creates a customization object that is used to specify how a menu item should be made
 * @param {*} menuItemConfigs array of menuItemConfig objects
 * @returns 
 */
export function getMenuItemCustomizations(menuItemConfigs) {
  const defaultCustomization =  {};
  menuItemConfigs.map(menuItemConfig => {
      defaultCustomization[menuItemConfig.label] = menuItemConfig.defaultValue;
   });

  return defaultCustomization;
}