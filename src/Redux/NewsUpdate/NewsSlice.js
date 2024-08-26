import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  articles: [],
  status: 'idle',
  error: null,
};
const MEDIA_API_KEY = 'af09aa35aeaffdebdc6e1819c203a6b3';
const GURDIAN_API_KEY = 'a1233c65-9385-4955-a48c-dc39067e02e7';
const OPEN_NEWS_API_KEY = '3f57c22fe7f04972b7baea0d6e79c154';

/*


-newsfeed cusomization
 - choosing prefered source, categories, and authors 
*/
//generates pending,fulifilled and rejected action types
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ keyword, category, source, dateRange, page = 1 }, thunkAPI) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayFormattedDate = `${year}-${month}-${day}`;
    today.setDate(today.getDate() - 1);
    const day1 = String(today.getDate()).padStart(2, '0');
    try {
      const mediaStackUrl = `http://api.mediastack.com/v1/news?access_key=${MEDIA_API_KEY}`;
      const guardianUrl = `https://content.guardianapis.com/search?api-key=${GURDIAN_API_KEY}`;
      const openNewsUrl = `https://newsapi.org/v2/everything?apiKey=${OPEN_NEWS_API_KEY}`;

      const yesterdayFormattedDate = `${year}-${month}-${day1}`;

      const mediaStackParams = {
        languages: 'en',
        categories: category || '',
        sources: source || '',
        keywords: keyword || '',
        date: dateRange?.from + ',' + dateRange?.to || todayFormattedDate,
        offset: (page - 1) * 15,
        limit: 15,
      };
      const guardianParams = {
        lang: 'en',
        q: keyword || '',
        'from-date': dateRange?.from || yesterdayFormattedDate,
        'to-date': dateRange?.to || todayFormattedDate,
        'page-size': 15,
        page,
        'show-elements': 'image',
        ...(category && { section: category }),
      };

      const openNewsParams = {
        q: keyword || 'today',
        from: dateRange?.from || yesterdayFormattedDate,
        to: dateRange?.to || todayFormattedDate,
        language: 'en',
        pageSize: 15,
        page,
      };

      const [guardianResponse, openNewsResponse, mediaStackResponse] =
        await Promise.all([
          axios.get(guardianUrl, { params: guardianParams }),
          axios.get(openNewsUrl, { params: openNewsParams }),
          axios.get(mediaStackUrl, { params: mediaStackParams }),
        ]);
      const allData = {
        openNews: openNewsResponse.data,
        guardian: guardianResponse.data.response,
        mediaStack: mediaStackResponse.data,
      };

      return allData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.articles = [
        ...action.payload.mediaStack.data,
        ...action.payload.guardian.results,
        ...action.payload.openNews.articles,
      ];
      state.error = null;
    });
    builder.addCase(fetchNews.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || action.error.message;
    });
  },
});

export default newsSlice.reducer;
