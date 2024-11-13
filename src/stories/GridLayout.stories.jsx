// src/stories/GridLayout.stories.jsx
import React from 'react';

const GridLayout = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="bg-white p-4 rounded-md shadow hover:shadow-lg transition duration-200 border border-gray-200">
      Item 1
    </div>
    <div className="bg-white p-4 rounded-md shadow hover:shadow-lg transition duration-200 border border-gray-200">
      Item 2
    </div>
    <div className="bg-white p-4 rounded-md shadow hover:shadow-lg transition duration-200 border border-gray-200">
      Item 3
    </div>
    <div className="bg-white p-4 rounded-md shadow hover:shadow-lg transition duration-200 border border-gray-200">
      Item 4
    </div>
    <div className="bg-white p-4 rounded-md shadow hover:shadow-lg transition duration-200 border border-gray-200">
      Item 5
    </div>
    <div className="bg-white p-4 rounded-md shadow hover:shadow-lg transition duration-200 border border-gray-200">
      Item 6
    </div>
  </div>
);

export default {
  title: 'Design System/Grid Layout',
  component: GridLayout,
};

export const DefaultGrid = () => <GridLayout />;
