import { useState } from 'react';
import {
  RouterProvider, createBrowserRouter, createRoutesFromElements,Route
} from 'react-router-dom';

import NotImplemented from './components/pages/not_implemented/not_implemented';
import Home from './components/pages/home/home';
import Product from './components/pages/product/product';
import Details from './components/pages/details/details';
import ShoppingCart from './components/pages/shopping_cart/shopping_cart';
import RootLayout from './components/shared/root_layout/root_layout';
import CartItemInterface from './interface/CartItemInterface';



function App() {

  const [cartItem, setCartItem] = useState<CartItemInterface[]>([]);
  const onCartAdd = (cartItemInterface: CartItemInterface) => {
    setCartItem(prev => {
      console.log([...prev, cartItemInterface]);
      return [cartItemInterface, ...prev];
    });
  }
  const onCartItemModify = (index: number, modifiedQuantity: number) => {
    setCartItem(cartItemList => {
      cartItemList[index].quantity = modifiedQuantity;
      return [...cartItemList];
    })
  }
  const onCartRemove = (index: number) => {
    setCartItem(cartItemList => {
      cartItemList.splice(index, 1);
      return [...cartItemList];
    })
  }
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={ <RootLayout cartNumber={
        cartItem.reduce(function (total, record) {
          return Number(total)+Number(record.quantity);
        }, 0)}/> } errorElement={<NotImplemented/>}>
        <Route index element={<Home/>} />
        <Route path='not-implemented' element={<NotImplemented/>} />
        <Route path='products' element={<Product/>} />
        <Route path='details/:productName' element={<Details onCartAdd={onCartAdd}/>} />
        <Route path='shopping-cart' element={<ShoppingCart cartNumber={
        cartItem.reduce(function (total, record) {
          return Number(total)+Number(record.quantity);
        }, 0)} cartItemsList={cartItem} onCartItemModify={onCartItemModify} onCartRemove={onCartRemove}/>} />
      </Route>
    ));
  
  return (
      <RouterProvider router = {router}/>
  );
}

export default App;
