import { createContext, useState } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import OrderPage from './pages/OrderPage';
import AboutUs from './pages/AboutUs';
import Cart from './pages/Cart';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const CartContext = createContext();

function App() {
  
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />}/>
        <Route path="/order" element={<OrderPage />}/>
        <Route path="/about" element={<AboutUs />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );
  return (
    <CartContext.Provider value={{cart, setCart}} >
      <RouterProvider router={router} />
    </CartContext.Provider>
  )
}

export default App
