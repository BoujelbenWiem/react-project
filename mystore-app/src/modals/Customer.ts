import type { Cart } from "./Cart";
export type Customer = {
    email: string;
    phone: string;
    note: string;
    billingAdress: {
        civility: string;
        firstName: string;
        lastName: string;
        zipCode: string;
        street: string;
        companyName: string;
        country: string;
        city: string;
    },
    shippingAdress: {
        civility: string;
        firstName: string;
        lastName: string;
        zipCode: string;
        street: string;
        companyName: string;
        country: string;
        city: string;
    }
}

export type Order = {
    cart: Cart;
    customer: Customer;
    paymentMethod: string;
}
