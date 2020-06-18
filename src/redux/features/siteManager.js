import { createSlice } from '@reduxjs/toolkit';

export const siteManager = createSlice({
	name: 'site',
	initialState: {
		step: 0
	},
	reducers: {
		updateStep: (state, action) => {
			state.step = action.payload;
		}
	},
});

export const { updateStep } = siteManager.actions;

export const selectStep = state => state.step;

export default siteManager.reducer;
