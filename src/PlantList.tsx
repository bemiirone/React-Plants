import React, { useState, useEffect } from 'react';
import { Plant } from './types';
import {
  getPlants,
  addPlant,
  updatePlant,
  deletePlant,
} from './plantService';

const PlantList: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [formData, setFormData] = useState<Omit<Plant, 'id'>>({
    name: '',
    family: '',
    image: '',
    year: 0,
  });

  useEffect(() => {
    const fetchPlants = async () => {
      const data = await getPlants();
      setPlants(data);
    };
    fetchPlants();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlant) {
      const updatedPlant = await updatePlant({
        id: selectedPlant.id,
        ...formData,
      });
      setPlants((prev) =>
        prev.map((p) => (p.id === updatedPlant.id ? updatedPlant : p))
      );
    } else {
      const newPlant = await addPlant(formData);
      setPlants((prev) => [...prev, newPlant]);
    }
    setFormData({ name: '', family: '', image: '', year: 0 });
    setSelectedPlant(null);
  };

  const handleEdit = (plant: Plant) => {
    setSelectedPlant(plant);
    setFormData(plant);
  };

  const handleDelete = async (id: number) => {
    await deletePlant(id);
    setPlants((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
  <h2 className="text-2xl mb-4">Plant List</h2>
  <form onSubmit={handleSubmit} className="mb-4">
    <input
      type="text"
      placeholder="Name"
      value={formData.name}
      onChange={(e) =>
        setFormData((prev) => ({ ...prev, name: e.target.value }))
      }
      className="border p-2 mr-2"
    />
    <button className="bg-blue-500 text-white p-2">
      {selectedPlant ? 'Update' : 'Add'}
    </button>
  </form>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {plants.map((plant) => (
      <div key={plant.id} className="border p-4 rounded">
         <img 
          src={plant.image} 
          alt={plant.name} 
          className="w-full h-48 object-cover mb-4 rounded"
        />
        <h3 className="text-lg font-semibold mb-2">{plant.name}</h3>
        <p className="mb-2">
          <span className="font-semibold">Family:</span> {plant.family}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Year:</span> {plant.year}
        </p>
        <div className="mt-4">
          <button 
            onClick={() => handleEdit(plant)} 
            className="bg-blue-500 text-white p-2 rounded mr-2 hover:bg-blue-600">
            Edit
          </button>
          <button 
            onClick={() => handleDelete(plant.id)} 
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default PlantList;
