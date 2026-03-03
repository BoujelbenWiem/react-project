import api from "./api";
import type { Cart } from "../modals/Cart";
import type { Customer } from "../modals/Customer";

export const getCart = async (): Promise<Cart> => {
    try {
        const response = await api.get<Cart>('/carts');  
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};

export const getCartById = async (id: string): Promise<Cart> => {
    try {
        const response = await api.get<Cart>(`/carts/${id}`);   
        return response.data;
    } catch (error) {
        console.error(`Error fetching cart with id ${id}:`, error);
        throw error;
    }
};

export const createCart = async (cart: Cart): Promise<Cart> => {
    try {
        const response = await api.post<Cart>('/carts', cart);  
        return response.data;
    } catch (error) {
        console.error('Error creating cart:', error);
        throw error;
    }   
};

export const updateCart = async (id: string, cart: Cart): Promise<Cart> => {
    try {
        const response = await api.put<Cart>(`/carts/${id}`, cart);  
        return response.data;
    } catch (error) {
        console.error(`Error updating cart with id ${id}:`, error);
        throw error;
    }
};

export const deleteCart = async (id: string): Promise<void> => {
    try {
        await api.delete(`/carts/${id}`);
    } catch (error) {
        console.error(`Error deleting cart with id ${id}:`, error);
        throw error;
    }   
};

export const createOrder = async (cart: Cart, customer: Customer, paymentMethod: string): Promise<void> => {
    try {
        const orderBody = {
            total : cart.total,
            subTotal : cart.subTotal,
            tax : cart.tax,
            items : cart.items,
            customer,
            paymentMethod
        };
        await api.post('/orders', orderBody);
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }   
};
