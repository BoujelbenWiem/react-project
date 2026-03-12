import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import type { Cart } from "../../modals/Cart";
import { getCartById, createCart, updateCart, deleteCart,createOrder } from "../../services/carts.service";
import type { Customer } from "../../modals/Customer";
import { uiActions } from "./uiSlice";


const TAX_RATE = 0.1; 
const calculateTotals = (items: Cart["items"]) => {
  const subTotal = items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const roundedSubTotal = Number(subTotal.toFixed(2));
  
  const tax = Number((roundedSubTotal * TAX_RATE).toFixed(2));
  const total = Number((roundedSubTotal + tax).toFixed(2));

  return {
    subTotal: roundedSubTotal,
    tax,
    total
  };
};


export const syncCart = createAsyncThunk(
  "cart/syncCart",
  async (_, { getState }) => {

    const state = getState() as { cart: Cart };
    const cart = state.cart;
    const cartId = localStorage.getItem("cartId");


    if (!cartId) {
      const newCart = await createCart(cart);
      console.log("Cart created successfully on the first attempt of buying", { cart: newCart, cartId: newCart.id });

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
 console.log("Fetching cart with ID:", cartId);
    if (cartId) {
      return await getCartById(cartId);
    }

    return null;
  }
);


export const confirmOrder = createAsyncThunk(
  "cart/confirmOrder",
  async (
    { customer, paymentMethod }: { customer: Customer; paymentMethod: string },
    { getState, dispatch }
  ) => {
    try {
    const state = getState() as { cart: Cart };
    const cart = state.cart;
    const cartId = localStorage.getItem("cartId");

    if (!cartId) {
      throw new Error("No cart to confirm");
    }
    await createOrder(cart, customer, paymentMethod);
    console.log("Order created successfully", { cart, customer, paymentMethod });
    await deleteCart(cartId);
  console.log("Cart deleted successfully", { cartId ,cart});
    

    localStorage.removeItem("cartId");
    dispatch(cartActions.clearCart());
    console.log(cart);
    dispatch(uiActions.showNotification({ status: "success", title: "Order Placed", message: "Your order has been placed successfully!" }));
    //console.log("Cart cleared successfully", { cartId });

    return true;
    } catch (error) {
      let message = "Failed to place order. Please try again.";
      if (error instanceof Error) {
        message= error.message;
      }
      dispatch(uiActions.showNotification({ status: "error", title: "Order Failed", message }));
      throw error;
    }
  }
);


const initialCartState: Cart = {
    id: localStorage.getItem("cartId") || "",
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
            const { product, quantity } = action.payload;
            console.log("discount rate", product.discountRate);
            const discountedPrice = Number((product.price * (1 - (product.discountRate / 100))).toFixed(2));
            console.log("discounted price", discountedPrice);
            const existingItem = state.items.find(item => item.id === product.id);
            if (existingItem) {
              existingItem.qty += quantity;
            } else {
              state.items.push({
                id: product.id,
                name: product.name,
                imageName: product.imageName,
                price: discountedPrice,
                qty: quantity,
              });
            }
            const totals = calculateTotals(state.items);
            state.subTotal = totals.subTotal;
            state.tax = totals.tax;
            state.total = totals.total;
        },
        removeItemFromCart(state, action) {
            const itemId = action.payload;
            state.items = state.items.filter(item => item.id !== itemId);
            const totals = calculateTotals(state.items);
            state.subTotal = totals.subTotal;
            state.tax = totals.tax;
            state.total = totals.total;

        },
        updateItemQuantity(state, action) {
            const { itemId, quantity } = action.payload;
            const existingItem = state.items.find(item => item.id === itemId);
            if (existingItem) {
                existingItem.qty = quantity;
                const totals = calculateTotals(state.items);
                state.subTotal = totals.subTotal;
                state.tax = totals.tax;
                state.total = totals.total;
            }
        },

        clearCart () {
            return initialCartState;
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