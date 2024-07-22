import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/authSlice';
import Cookies from 'js-cookie';
// import productsReducer from './productSlice';

// const preloadedState = () => {
//   const authCookie = Cookies.get('auth');
//   if (authCookie) {
//     return { auth: JSON.parse(authCookie) };
//   }
//   return undefined;
// }

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // products: productsReducer,

  },
});