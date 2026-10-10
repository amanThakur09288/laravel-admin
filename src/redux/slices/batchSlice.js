import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const batchSlice = createSlice({
    name: "batches",

    initialState,

    reducers: {
        setBatches: (state, action) => {
            state.items = action.payload;
        },

        addBatch: (state, action) => {
            state.items.push(action.payload);
        },

        updateBatchState: (state, action) => {
            const updatedBatch = action.payload;

            const index = state.items.findIndex(
                (batch) => batch.id === updatedBatch.id
            );

            if (index !== -1) {
                state.items[index] = updatedBatch;
            }
        },

        removeBatch: (state, action) => {
            state.items = state.items.filter(
                (batch) => batch.id !== action.payload
            );
        },

        clearBatches: (state) => {
            state.items = [];
        },
    },
});

export const {
    setBatches,
    addBatch,
    updateBatchState,
    removeBatch,
    clearBatches,
} = batchSlice.actions;

export default batchSlice.reducer;