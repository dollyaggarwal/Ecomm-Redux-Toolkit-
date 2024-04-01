import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	getADocsFromFirestore,
	setDataToFirestoreRef,
} from '../../firebase/firebase';
import toast from 'react-hot-toast';

const initialState = {
	orders: [],
	orderTotal: 0,
};
export const fetchOrders = createAsyncThunk(
	'fetchOrders',
	async ({ userId }, thunkAPI) => {
		try {
			if (userId) {
				const getOrders = await getADocsFromFirestore('orders', userId);
				thunkAPI.dispatch(setToOrders(getOrders.orders));
				thunkAPI.dispatch(findOrderTotal());
			}
		} catch (error) {
			console.log(error);
		}
	}
);

export const checkoutOrders = createAsyncThunk(
	'checkoutOrders',
	async ({ userId }, thunkAPI) => {
		try {
			if (userId) {
				const getCarts = await getADocsFromFirestore('carts', userId);
				const previousOrder = thunkAPI.getState().orderReducer.orders;
				const updatedOrders = await setDataToFirestoreRef('orders', userId, {
					orders: [
						...previousOrder,
						{
							order: getCarts.carts,
							createdAt: new Date().toDateString(),
						},
					],
				});
				await setDataToFirestoreRef('carts', userId, {
					carts: [],
					updatedAt: new Date().toDateString(),
				});
				thunkAPI.dispatch(fetchOrders({ userId }));
				toast.success('Order placed successfully');
			} else {
				toast.error('Please login to place order');
			}
		} catch (error) {
			console.log(error);
		}
	}
);

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setToOrders: (state, action) => {
			state.orders = action.payload;
		},
		findOrderTotal: (state, action) => {
			state.orderTotal = state.orders
				.reduce(
					(acc, curr) =>
						acc +
						curr.order
							.map((item) => item.price)
							.reduce((sum, price) => sum + price, 0),
					0
				)
				.toLocaleString('en-IN');
		},
	},
});

export const orderReducer = orderSlice.reducer;
export const { findOrderTotal, setToOrders } = orderSlice.actions;
export const orderSelector = (state) => state.orderReducer;
