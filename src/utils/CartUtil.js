import * as lodash from 'lodash'

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

/**
 * Updates the cart object. 
 * Checks if the menuItem is present in the cart. If so update the count of that item
 * If menuItem is not present in the cart adds the item to cart.  
 * @param {*} cart 
 * @param {*} item - {name, price, count, details} 
 */
export function updateCart(cart, item) {
  const originalCartCopy = cart.slice();

  const itemIndex = originalCartCopy.findIndex(c => c.name === item.name && lodash.isEqual(c.details, item.details));

  if(itemIndex > -1) {
    originalCartCopy[itemIndex].count += 1;
    return originalCartCopy;
  } 

  return [
  ...originalCartCopy,
  item
  ]
}

export function updateCartItem(cart, item) {
  const originalCartCopy = cart.slice();

  const itemIndex = originalCartCopy.findIndex(c => c.name === item.name && lodash.isEqual(c.details, item.details));

  if(itemIndex > -1) {
    originalCartCopy[itemIndex] = item;
    return originalCartCopy;
  } 

  return [
  ...originalCartCopy,
  item
  ]
}

export function countCartItems(cart) {
  let count = 0;
  if(cart.length ) {
    cart.forEach(c => {
      count += c.count;
    });
  }
  return count;
}