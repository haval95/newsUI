import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onSave }) => {
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState('');

  const handleCategoryClick = (category) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  const handleTopicChange = (e) => {
    setTopics(e.target.value);
  };

  const handleSubmit = () => {
    onSave({ categories, topics: topics.split(',').map((t) => t.trim()) });
    onClose();
  };

  if (!isOpen) return null;

  const categoryOptions = [
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology',
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Set Your Preferences</h2>
        <div className="mb-4">
          <h3 className="font-medium mb-2">Favorite Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((category) => (
              <span
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`cursor-pointer px-4 py-2 rounded-lg border border-gray-300 transition-colors ${
                  categories.includes(category)
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-blue-500'
                }`}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-medium mb-2">Interested Topics</h3>
          <input
            type="text"
            value={topics}
            onChange={handleTopicChange}
            className="border p-2 rounded w-full"
            placeholder="e.g., AI, Climate Change"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black p-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
