import React, { useState, useEffect } from 'react';
import { Plant } from './types';
import { getPlants, deletePlant } from './plantService';
import PlantFilter from './PlantFilter';

const PlantList: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [filter, setFilter] = useState('');

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const filteredPlants = plants.filter(plant => 
    plant.name.includes(filter) || 
    plant.family.includes(filter) || 
    plant.year.toString().includes(filter) 
);

  useEffect(() => {
    const fetchPlants = async () => {
      const data = await getPlants();
      setPlants(data);
    };
    fetchPlants();
  }, []);

  const handleDelete = async (id: number) => {
    await deletePlant(id);
    setPlants((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className='container mx-auto p-6'>
      <h2 className='text-2xl mb-4'>Plant List</h2>
      <PlantFilter onFilterChange={handleFilterChange} />
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlants.map((plant) => (
            <li key={plant.id} className="border p-4 rounded">
                <img src={plant.image} alt={plant.name} className="w-full h-32 object-cover rounded mb-4"/>
                <h3 className="text-xl mb-2">{plant.name}</h3>
                <p className="mb-2">{plant.family}</p>
                <p className="mb-2">{plant.year}</p>
                <button 
                    onClick={() => handleDelete(plant.id)} 
                    className="bg-red-500 text-white p-2 rounded">
                    Delete
                </button>
            </li>
        ))}
    </ul>
    </div>
  );
};

export default PlantList;
