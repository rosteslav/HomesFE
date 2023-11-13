import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // items: [{ id: '', name: '' }]
    itemsState: []
};

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.itemsState = action.payload;
        }
    }
});

export const { setItems } = itemsSlice.actions;

export const selectedItems = (state) => state.items.itemsState;

export default itemsSlice.reducer;
