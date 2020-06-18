import { configureStore } from '@reduxjs/toolkit';
import siteReducer from './features/siteManager';

export default configureStore({
	reducer: {
		step: siteReducer,
	},
});
