import React, { useState } from 'react';
import { Plant } from './types';

interface PlantProps {
  plant: Plant;
  onClose: () => void;
  onEdit: (updatedPlant: Plant) => void;
}

const PlantDetail: React.FC<PlantProps> = ({ plant, onEdit, onClose }) => {
    const { id, name, family, year, image } = plant;
    const [editableName, setEditableName] = useState(name);
    const [editableFamily, setEditableFamily] = useState(family);
    const [editableYear, setEditableYear] = useState(year?.toString() || '');

    const handleEdit = () => {
        onEdit({
            id,
            name: editableName,
            family: editableFamily,
            year: parseInt(editableYear, 10),
            image
        });
    };

    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="bg-white p-4 border rounded shadow-lg w-3/4 max-w-xl">
            <img src={image} alt={name} className="w-full h-48 object-cover mb-4"/>
            <input
                type="text"
                value={editableName}
                onChange={e => setEditableName(e.target.value)}
                className="border p-2 mb-2 w-full"
                placeholder="Name"
            />
            <input
                type="text"
                value={editableFamily}
                onChange={e => setEditableFamily(e.target.value)}
                className="border p-2 mb-2 w-full"
                placeholder="Family"
            />
            <input
                type="text"
                value={editableYear}
                onChange={e => setEditableYear(e.target.value)}
                className="border p-2 mb-2 w-full"
                placeholder="Year"
            />
            <button onClick={handleEdit} className="bg-blue-500 text-white p-2 rounded mr-2">Save</button>
            <button onClick={onClose} className="bg-red-500 text-white p-2 rounded">Cancel</button>
        </div>
      </div>
    );
}

export default PlantDetail;
