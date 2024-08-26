// NewsFeed.js
import React, { useEffect, useState } from 'react';
import NewsCardSkellaton from './NewsCardSkellaton';
import NewsCardComponent from './NewsCardComponent';
import { v4 as uuidv4 } from 'uuid';
const getFirstAvailable = (article, keys) => {
  for (const key of keys) {
    const value = key
      .split('.')
      .reduce((acc, part) => acc && acc[part], article);
    if (value !== undefined && value !== null) {
      return value;
    }
  }
  return null;
};

const NewsFeed = ({ articles, status, error, filters, handlePageChange }) => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (status === 'succeeded') {
      const articlesElement = articles.map((article, index) => {
        let data = {
          image:
            article.elements?.[0].assets?.[0].file ||
            getFirstAvailable(article, [
              'image',
              'elements?.[0].assets?.[0].file',
              'urlToImage',
            ]),
          title: getFirstAvailable(article, ['title', 'webTitle']),
          published_at: getFirstAvailable(article, [
            'published_at',
            'webPublicationDate',
            'publishedAt',
          ]),
          category: getFirstAvailable(article, ['sectionName', 'category']),
          author: getFirstAvailable(article, ['author', 'type']),
        };

        return <NewsCardComponent {...data} key={uuidv4()} />;
      });
      setElements(articlesElement);
    }
  }, [articles, status]);

  return (
    <div className=" bg-gray-100 p-6  ml-3 ">
      <div className="flex flex-wrap gap-6">
        {status === 'loading' && (
          <>
            <NewsCardSkellaton />
            <NewsCardSkellaton />
            <NewsCardSkellaton />
            <NewsCardSkellaton />
            <NewsCardSkellaton />
            <NewsCardSkellaton />
          </>
        )}
        {status === 'failed' && (
          <p className="font-bold h-screen flex flex-col pt-16  text-center w-full">
            Error: {error}
          </p>
        )}
        {status === 'succeeded' && elements}
      </div>
      {status === 'succeeded' && (
        <div className="flex justify-between mt-6">
          <button
            disabled={filters.page === 1}
            onClick={() => handlePageChange(filters.page - 1)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(filters.page + 1)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
