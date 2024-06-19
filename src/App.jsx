import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import OrderPage from './pages/OrderPage';
import AboutUs from './pages/AboutUs';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />}/>
        <Route path="/order" element={<OrderPage />}/>
        <Route path="/about" element={<AboutUs />}/>
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );
  return (
    <RouterProvider router={router} />
  )
}

export default App
