import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Product = {
	id: number;
	name: string;
	price: number;
};

export type CartItem = Product & { count: number };

type ProductsState = {
	products: Product[];
	cart: CartItem[];
};

const initialState: ProductsState = {
	products: [
		{ id: 1, name: 'Product 1', price: 100 },
		{ id: 2, name: 'Product 2', price: 200 },
		{ id: 3, name: 'Product 3', price: 300 },
		{ id: 4, name: 'Product 4', price: 400 },
		{ id: 5, name: 'Product 5', price: 500 },
	],
	cart: [],
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		addProduct: (state, action: PayloadAction<Product>) => {
			if (state.cart.find((product) => product.id !== action.payload.id)) {
				state.cart.push({...action.payload, count: 1});
			}
			
		},
		removeProduct: (state, action: PayloadAction<number>) => {
			state.cart = state.cart.filter((product) => product.id !== action.payload);
		},
		increaseProductCount: (state, action: PayloadAction<number>) => {
			const product = state.cart.find((product) => product.id === action.payload);
			if (product) {
				product.count += 1;
			}
		},
		decrementProductCount: (state, action: PayloadAction<number>) => {
			const product = state.cart.find((product) => product.id === action.payload);
			if (product) {
				product.count -= 1;
			}
		}
	},
});

export const { addProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;