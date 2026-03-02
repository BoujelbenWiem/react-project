import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import type { Cart } from "../../modals/Cart";
import { getCartById,getCart, createCart, updateCart, deleteCart,createOrder } from "../../services/carts.service";



export const syncCart = createAsyncThunk(
  "cart/syncCart",
  async (_, { getState }) => {

    const state = getState() as { cart: Cart };
    const cart = state.cart;
    const cartId = localStorage.getItem("cartId");

    if (!cartId) {
      const newCart = await createCart(cart);

      localStorage.setItem("cartId", newCart.id);

      return newCart;
    }

    const updatedCart = await updateCart(cartId, cart);
    return updatedCart;
  }
);

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async () => {

 const cartId = localStorage.getItem("cartId");
    // 🟢 Cart already exists
    if (cartId) {
      return await getCartById(cartId);
    }

    return null;
  }
);


export const confirmOrder = createAsyncThunk(
  "cart/confirmOrder",
  async (
    { customer, paymentMethod }: { customer: any; paymentMethod: string },
    { getState, dispatch }
  ) => {

    const state = getState() as { cart: Cart };
    const cart = state.cart;
    const cartId = localStorage.getItem("cartId");

    if (!cartId) {
      throw new Error("No cart to confirm");
    }
    await createOrder(cart, customer, paymentMethod);
    await deleteCart(cartId);

    localStorage.removeItem("cartId");
    dispatch(cartActions.clearCart());

    return true;
  }
);


const initialCartState: Cart = {
    id: localStorage.getItem("cartId") || null,
    total: 0,
    subTotal: 0,
    tax: 0,
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        addItemToCart(state, action) {
            // logic to add item to cart
            const { product, quantity } = action.payload;
            
            const existingItem = state.items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.qty += quantity;
            } else {
                state.items.push({
                    id: product.id,
                    name: product.name,
                    imageName: product.imageName,
                    price: product.price,
                    qty: quantity,
                });
            }
            state.subTotal = state.items.reduce((acc, item) => acc + item.price * item.qty, 0);
            state.tax = state.subTotal * 0.1; // Assuming 10% tax
            state.total = state.subTotal + state.tax;
            
        },
        removeItemFromCart(state, action) {
            // logic to remove item from cart
            const itemId = action.payload;
            state.items = state.items.filter(item => item.id !== itemId);
            state.subTotal = state.items.reduce((acc, item) => acc + item.price * item.qty, 0);
            state.tax = state.subTotal * 0.1;
            state.total = state.subTotal + state.tax;

        },
        updateItemQuantity(state, action) {
            // logic to update item quantity in cart
            const { itemId, quantity } = action.payload;
            const existingItem = state.items.find(item => item.id === itemId);
            if (existingItem) {
                existingItem.qty = quantity;
                state.subTotal = state.items.reduce((acc, item) => acc + item.price * item.qty, 0);
                state.tax = state.subTotal * 0.1;
                state.total = state.subTotal + state.tax;
            }
        },

        clearCart (state) {
            state.items = [];
            state.subTotal = 0;
            state.tax = 0;
            state.total = 0;
        },
        
    },  
    extraReducers: (builder) => {

    builder.addCase(fetchCart.fulfilled, (_, action) => {
      if (!action.payload) return initialCartState;
      return action.payload;
    });

    builder.addCase(syncCart.fulfilled, (_, action) => {
      return action.payload;
    });

    builder.addCase(confirmOrder.fulfilled, () => {
      return initialCartState;
    });

  }

  });


            




export const cartActions = cartSlice.actions;
export default cartSlice.reducer;