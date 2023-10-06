import React from 'react';
import './App.css';
import PlantList from './PlantList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Plant App</h1>
        </header>
        <PlantList />
      </div>
    </div>
  );
}

export default App;
