import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { Product } from '../../models';

interface Item {
  product: Product;
  quantity: number;
}

interface CartState {
  cart: Item[];
  checkout: { rate: number | null; price: number | null };
  totalPrice: number;
  finalPrice: number;
}

let initialState: CartState = {
  cart: [],
  checkout: { rate: null, price: null },
  totalPrice: 0,
  finalPrice: 0,
};

const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    InsertItem: ({ cart }, { payload }: PayloadAction<Item>) => {
      let index = cart.findIndex((el) => el.product.id === payload.product.id);
      if (index === -1) {
        cart.push(payload);
      } else {
        cart[index].quantity += payload.quantity;
      }
    },
    DeleteItem: ({ cart }, { payload }: PayloadAction<number>) => {
      let index = cart.findIndex((el) => el.product.id === payload);
      if (index !== -1) cart.splice(index, 1);
    },
    UpdateItem: (
      { cart },
      {
        payload: { id, quantity },
      }: PayloadAction<{ quantity: number; id: number }>
    ) => {
      let index = cart.findIndex((el) => el.product.id === id);
      if (index !== -1) cart[index].quantity = quantity;
    },
    EmptyCart: (state, _: PayloadAction) => {
      state.cart = [];
      state.totalPrice = 0;
    },
    setTotalPrice: (state, { payload }: PayloadAction<number>) => {
      state.finalPrice = payload;
    },
  },
});

export const {
  InsertItem,
  DeleteItem,
  UpdateItem,
  EmptyCart,
  setTotalPrice,
} = CartSlice.actions;

export const selectCart = (state: RootState) => state.Cart.cart;
export const selectCheckout = (state: RootState) => state.Cart.checkout;
export const selectTotalPrice = (state: RootState) => state.Cart.totalPrice;
export const selectFinalPrice = (state: RootState) => state.Cart.finalPrice;

export default CartSlice.reducer;
