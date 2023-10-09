import React, { useState } from 'react';
import { Plant } from './types';
import { addPlant } from './plantService';


interface AddPlantModalProps {
  onClose: () => void;
  onAdd: (newPlant: Plant) => void;
}

const AddPlantModal: React.FC<AddPlantModalProps> = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [family, setFamily] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async () => {
    const newPlantDetails: Omit<Plant, 'id'> = {
      name,
      family,
      year: parseInt(year, 10),
      image
    };
    
    try {
      const addedPlant = await addPlant(newPlantDetails);
      onAdd(addedPlant);
      onClose();
    } catch (error) {
      console.error('Failed to add plant:', error);
    }
};

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded">
        <h2 className="text-2xl mb-4">Add New Plant</h2>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 mb-2 w-full"
          placeholder="Name"
        />
        <input
          type="text"
          value={family}
          onChange={e => setFamily(e.target.value)}
          className="border p-2 mb-2 w-full"
          placeholder="Family"
        />
        <input
          type="text"
          value={year}
          onChange={e => setYear(e.target.value)}
          className="border p-2 mb-2 w-full"
          placeholder="Year"
        />
        <input
          type="text"
          value={image}
          onChange={e => setImage(e.target.value)}
          className="border p-2 mb-2 w-full"
          placeholder="Image URL"
        />
        <div className="flex justify-end">
          <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded mr-2">Add</button>
          <button onClick={onClose} className="bg-red-500 text-white p-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddPlantModal;
