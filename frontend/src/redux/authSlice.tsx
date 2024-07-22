import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { products } from '@/component/data/Index';
import axios from 'axios';


const initialState = Cookies.get('auth') ? JSON.parse(Cookies.get('auth') as string) : {
  isAuthenticated: false,
  user: "",
  cart: [],
  totalQuantity: 0,
  totalAmount: 0,
  product: products,
  prod: [],
  status: 'idle',
  error: null,
}


console.log('Initial State:', initialState);

export const fetchProducts: any = createAsyncThunk('/fetchProducts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response;
  
});

export const authSlice = createSlice({
  
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      Cookies.set('auth', JSON.stringify(state), { expires: 7 });
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = "";
      state.cart = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      Cookies.remove('auth');

    },

    addToCart: (state, action) => {
      let find = state.cart.findIndex((item: any) => item.id === action.payload.id);
      if (find >= 0) {
        state.cart[find].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
      state.totalQuantity = state.cart.reduce((total: any, item: any) => total + item.quantity, 0);
      state.totalAmount = state.cart.reduce((total: any, item: any) => total + (item.quantity * item.price), 0);
      Cookies.set('auth', JSON.stringify(state), { expires: 7 });
    },

     clearCart(state) {
            state.cart = [];
            state.totalQuantity = 0;
       state.totalAmount = 0;
       Cookies.remove('auth')
        },
  },
  
  
   extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.prod = action.payload; 
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { login, logout, addToCart, clearCart } = authSlice.actions;
export default authSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//   items: [],
//   status: 'idle',
//   error: null,
// };

// // Async thunks for CRUD operations
// export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
//   const response = await axios.get('/api/items');
//   return response.data;
// });

// export const addItem = createAsyncThunk('items/addItem', async (newItem) => {
//   const response = await axios.post('/api/items', newItem);
//   return response.data;
// });

// export const updateItem = createAsyncThunk('items/updateItem', async (updatedItem) => {
//   const { id, ...data } = updatedItem;
//   const response = await axios.put(`/api/items/${id}`, data);
//   return response.data;
// });

// export const deleteItem = createAsyncThunk('items/deleteItem', async (id) => {
//   await axios.delete(`/api/items/${id}`);
//   return id;
// });



// const itemsSlice = createSlice({
//   name: 'items',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchItems.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchItems.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.items = action.payload;
//       })
//       .addCase(fetchItems.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })

//       .addCase(addItem.fulfilled, (state, action) => {
//         state.items.push(action.payload);
//       })

//       .addCase(updateItem.fulfilled, (state, action) => {
//         const index = state.items.findIndex(item => item.id === action.payload.id);
//         state.items[index] = action.payload;
//       })
//       .addCase(deleteItem.fulfilled, (state, action) => {
//         state.items = state.items.filter(item => item.id !== action.payload);
//       });
//   },
// });

// export default itemsSlice.reducer;
