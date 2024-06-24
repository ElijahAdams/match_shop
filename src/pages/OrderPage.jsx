import React, { useEffect, useState } from 'react'

const OrderPage = () => {
const [menuItems, setMenuItems] = useState([]);
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  setIsLoading(true);
  const fetchMenuItems = async () => {
    try {
      const url = '/api/menuItems';
      const res = await fetch(url);
      const data = await res.json();
      setMenuItems(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }
  fetchMenuItems();
}, []);

  return (
    <>
    {isLoading ? 
      <h1> ... </h1> : 
      (<div>{menuItems.map((menuItem) => (<h1 key={menuItem.name}>{menuItem.name} </h1>) )}</div>)
    }
    </>
  )
}

export default OrderPage