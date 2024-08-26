import React from 'react';
import placeHolder from './placeHolder.jpg';

function timeAgo(publishedAt) {
  const publishedDate = new Date(publishedAt);
  const now = new Date();

  const diffInMilliseconds = now - publishedDate;
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
}

function NewsCardComponent({ image, title, published_at, category, author }) {
  return (
    <div className="relative  bg-white overflow-hidden  flex-1 min-w-[300px] border-b-4 border-blue-500 w-1/3 text-start">
      <img
        src={image || placeHolder}
        alt="People"
        className="w-full object-cover h-32 sm:h-48 md:h-64"
      />
      <div className="p-4 md:p-6 ">
        <div className="pb-4">
          <p className="text-blue-500 font-semibold text-xs mb-1 leading-none">
            {category}
          </p>
          <h3 className="font-semibold  text-xl leading-tight sm:leading-normal">
            {title}
          </h3>
        </div>
        <div className="text-sm flex items-center absolute bottom-4">
          <svg
            className="opacity-75 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            width="12"
            height="12"
            viewBox="0 0 97.16 97.16"
          >
            <path d="M48.58,0C21.793,0,0,21.793,0,48.58s21.793,48.58,48.58,48.58s48.58-21.793,48.58-48.58S75.367,0,48.58,0z M48.58,86.823    c-21.087,0-38.244-17.155-38.244-38.243S27.493,10.337,48.58,10.337S86.824,27.492,86.824,48.58S69.667,86.823,48.58,86.823z" />
            <path d="M73.898,47.08H52.066V20.83c0-2.209-1.791-4-4-4c-2.209,0-4,1.791-4,4v30.25c0,2.209,1.791,4,4,4h25.832    c2.209,0,4-1.791,4-4S76.107,47.08,73.898,47.08z" />
          </svg>
          <p className="leading-none ">
            {timeAgo(published_at)} | {author}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewsCardComponent;
