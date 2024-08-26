import React from 'react';
import FiltersSidebar from '../components/news/FiltersSidebar';
import NewsFeed from '../components/news/NewsFeed';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../Redux/NewsUpdate/NewsSlice';

function Home({ filters, setFilters }) {
  const { articles, status, error } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    setFilters({
      ...filters,
      dateRange: { ...filters.dateRange, [e.target.name]: e.target.value },
    });
  };

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
  };

  const fetchNewsWithFilters = () => {
    dispatch(fetchNews(filters));
  };

  return (
    <div className="flex flex-col bg-gray-100">
      <h1 className="text-3xl font-bold my-4">News Feed</h1>
      <FiltersSidebar
        filters={filters}
        handleInputChange={handleInputChange}
        handleDateChange={handleDateChange}
        fetchNews={fetchNewsWithFilters}
      />

      <NewsFeed
        articles={articles}
        status={status}
        error={error}
        filters={filters}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default Home;
