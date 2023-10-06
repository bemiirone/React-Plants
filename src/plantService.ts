import { Plant } from './types';

const BASE_URL = 'http://localhost:3000/plants';

export const getPlants = async (): Promise<Plant[]> => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch plants');
  }
  return await response.json();
};

export const getPlantById = async (id: number): Promise<Plant> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch plant by id');
  }
  return await response.json();
};

export const addPlant = async (plant: Omit<Plant, 'id'>): Promise<Plant> => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(plant)
  });
  if (!response.ok) {
    throw new Error('Failed to add plant');
  }
  return await response.json();
};

export const updatePlant = async (updatedPlant: Plant): Promise<Plant> => {
  const response = await fetch(`${BASE_URL}/${updatedPlant.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedPlant)
  });
  if (!response.ok) {
    throw new Error('Failed to update plant');
  }
  return await response.json();
};

export const deletePlant = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete plant');
  }
};
