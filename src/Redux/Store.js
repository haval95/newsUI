import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './NewsUpdate/NewsSlice';

const Store = configureStore({
  reducer: {
    news: newsReducer,
  },
});

export default Store;
