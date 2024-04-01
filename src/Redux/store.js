import { configureStore } from '@reduxjs/toolkit';
import { itemReducer } from './Reducers/itemsReducer';
import { cartReducer } from './Reducers/cartReducer';
import { orderReducer } from './Reducers/orderReducer';

export const store = configureStore({
	reducer: {
		itemReducer,
		cartReducer,
		orderReducer,
	},
});
