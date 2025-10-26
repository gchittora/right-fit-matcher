const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const matchUniversities = async (profileData) => {
  const response = await fetch(`${API_URL}/api/match`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profileData)
  });

  if (!response.ok) {
    throw new Error('Failed to fetch matches');
  }

  return response.json();
};

export const getAllUniversities = async () => {
  const response = await fetch(`${API_URL}/api/universities`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch universities');
  }

  return response.json();
};
