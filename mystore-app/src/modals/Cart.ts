export type CartItem = {
    id: string;
    name: string;
    imageName: string;
    price: number;
    qty : number;
}

export type Cart = {
    id: string;
    total: number;
    subTotal: number;
    tax: number;
    items: CartItem[];
    
}
