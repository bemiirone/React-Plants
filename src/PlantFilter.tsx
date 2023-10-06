import React, { useState, ChangeEvent } from 'react';

interface PlantFilterProps {
  onFilterChange: (filter: string) => void;
}

const PlantFilter: React.FC<PlantFilterProps> = ({ onFilterChange }) => {
  const [filter, setFilter] = useState<string>('');

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFilter(newValue);
    onFilterChange(newValue);
  };

  return (
    <input
      type="text"
      value={filter}
      onChange={handleFilterChange}
      placeholder="Filter by 'name', 'family' or 'year'"
      className="px-3 py-2 border rounded w-full mb-4"
    />
  );
}

export default PlantFilter;
