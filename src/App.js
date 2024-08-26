import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { fetchNews } from './Redux/NewsUpdate/NewsSlice';

import Home from './Pages/Home';
import Modal from './components/news/Modal';

function App() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    source: '',
    dateRange: {
      from: '',
      to: '',
    },
    page: 1,
  });

  useEffect(() => {
    const userPreferences = localStorage.getItem('userPreferences');
    if (!userPreferences) {
      setShowModal(true);
    } else {
      const { categories, topics } = JSON.parse(userPreferences);
      setFilters((prevFilters) => ({
        ...prevFilters,
        category: categories.join(','),
        keyword: topics.join(' '),
      }));
    }
  }, []);

  const handleSavePreferences = (preferences) => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: preferences.categories.join(','),
      keyword: preferences.topics.join(' '),
    }));
  };
  useEffect(() => {
    dispatch(fetchNews(filters));
  }, [filters, dispatch]);

  return (
    <div className="App">
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSavePreferences}
      />
      <div>
        <Routes>
          <Route
            path="/"
            exact
            element={<Home filters={filters} setFilters={setFilters} />}
          />
          <Route
            path="*"
            exact
            element={
              <div className="font-bold h-screen flex flex-col justify-center items-center ">
                <h1>404 Path Not Found!</h1>
                <Link
                  to="/"
                  className="bg-blue-400 px-3 py-1 rounded m-4 text-white hover:bg-blue-500 duration-200"
                >
                  Home
                </Link>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
