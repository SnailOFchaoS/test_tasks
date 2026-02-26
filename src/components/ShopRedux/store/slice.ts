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
			const existing = state.cart.find((product) => product.id === action.payload.id);
			if (existing) {
				existing.count += 1;
			} else {
				state.cart.push({ ...action.payload, count: 1 });
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
			if (product?.count === 1) {
				state.cart = state.cart.filter((product) => product.id !== action.payload);
			}
			if (product) {
				product.count -= 1;
			}
		},
		clearCart: (state) => {
			state.cart = [];
		}
	},
});

export const { addProduct, removeProduct, increaseProductCount, decrementProductCount, clearCart } = productsSlice.actions;
export default productsSlice.reducer;