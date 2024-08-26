// FiltersSidebar.js
import React from 'react';

const FiltersSidebar = ({ filters, handleInputChange, handleDateChange }) => {
  return (
    <form className="flex flex-wrap gap-5 mx-auto px-4">
      <div className="w-full md:w-auto   ">
        <input
          type="text"
          name="keyword"
          value={filters.keyword}
          onChange={handleInputChange}
          placeholder="Search by keyword"
          className="p-2 border border-gray-300 rounded text-black outline-none w-full"
        />
      </div>

      <div className="w-full md:w-auto  ">
        <select
          name="category"
          value={filters.category}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded text-black outline-none"
        >
          <option value="">All Categories</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
      </div>

      <div className="w-full md:w-auto   flex items-center">
        <input
          type="date"
          name="from"
          value={filters.dateRange.from}
          onChange={handleDateChange}
          className="w-full p-2 border border-gray-300 rounded text-black outline-none"
        />
        <span className="px-2">-</span>
        <input
          type="date"
          name="to"
          value={filters.dateRange.to}
          onChange={handleDateChange}
          className="w-full p-2 border border-gray-300 rounded text-black outline-none"
        />
      </div>
    </form>
  );
};

export default FiltersSidebar;
