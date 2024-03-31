import { createSlice } from '@reduxjs/toolkit';
import { Items } from '../../data/itemsData';


const initialState = {
	Items: Items,
};

const itemsSlice = createSlice({
	name: 'items',
	initialState,
	reducers: {
		searchItems: (state, action) => {
			const searchQuery = action.payload;
			if (action.payload.length > 0) {
				const filteredItems = state.Items.filter((item) =>
					item.title.toLowerCase().includes(searchQuery.toLowerCase())
				);
				state.Items = filteredItems;
			} else {
				state.Items = Items;
			}
		},
	},
});

export const itemReducer = itemsSlice.reducer;
export const { searchItems } = itemsSlice.actions;
export const itemSelector = (state) => state.itemReducer;
