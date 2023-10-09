import React, { useState, useEffect } from 'react';
import { Plant } from './types';
import { getPlants, deletePlant } from './plantService';
import PlantFilter from './PlantFilter';
import PlantDetail from './PlantDetail';
import AddPlantModal from './AddPlantModal';

const PlantList: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [filter, setFilter] = useState('');

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const filteredPlants = plants.filter(
    (plant) =>
      plant.name.includes(filter) ||
      plant.family.includes(filter) ||
      plant.year.toString().includes(filter)
  );

  const [selectedPlantDetail, setSelectedPlantDetail] = useState<Plant | null>(
    null
  );

  useEffect(() => {
    const fetchPlants = async () => {
      const data = await getPlants();
      setPlants(data);
    };
    fetchPlants();
  }, []);

  const handlePlantClick = (plant: Plant) => {
    setSelectedPlantDetail(plant);
  };

  const handlePlantDetailEdit = (updatedPlant: Plant) => {
    const updatedPlants = plants.map((plant) =>
      plant.id === updatedPlant.id ? updatedPlant : plant
    );
    setPlants(updatedPlants);
    setSelectedPlantDetail(null);
  };

  const handlePlantDetailCancel = () => {
    setSelectedPlantDetail(null); 
  };

  const handleDelete = async (id: number) => {
    await deletePlant(id);
    setPlants((prev) => prev.filter((p) => p.id !== id));
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const handleAddNewPlant = (newPlant: Plant) => {
    setPlants(prev => [...prev, newPlant]);
  };  

  return (
    <div className='container mx-auto p-6'>
      <h2 className='text-2xl mb-4'>Plant List</h2>
      <button onClick={() => setIsAddModalOpen(true)} className="bg-green-500 text-white p-2 rounded mb-4">Add New Plant</button>
      {isAddModalOpen && <AddPlantModal onClose={() => setIsAddModalOpen(false)} onAdd={handleAddNewPlant} />}
      <PlantFilter onFilterChange={handleFilterChange} />
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {filteredPlants.map((plant) => (
          <li key={plant.id} className='border p-4 rounded'>
            <img
              src={plant.image}
              alt={plant.name}
              className='w-full h-32 object-cover rounded mb-4'
            />
            <h3
              className='text-xl mb-2 cursor-pointer'
              onClick={() => setSelectedPlantDetail(plant)}
            >
              {plant.name}
            </h3>
            <p className='mb-2'>{plant.family}</p>
            <p className='mb-2'>{plant.year}</p>
            <button
              onClick={() => handleDelete(plant.id)}
              className='bg-red-500 text-white p-2 rounded'
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {selectedPlantDetail && (
        <>
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40" onClick={handlePlantDetailCancel}></div>
        <PlantDetail
          plant={selectedPlantDetail}
          onEdit={handlePlantDetailEdit}
          onClose={() => setSelectedPlantDetail(null)}
        />
        </>
      )}
    </div>
  );
};

export default PlantList;
