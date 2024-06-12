import { useQuery } from 'react-query';
const API_URL = 'http://localhost:5050';

export const fetchRoomById = async (id) => {
	try {
		const response = await fetch(`${API_URL}/rooms/${id}`);
		if (!response.ok) {
			throw new Error('Failed to fetch room data');
		}
		return response.json();
	} catch (error) {
		console.error('Fetch room data error:', error);
		throw error;
	}
};

export const useRoomQuery = (id) => {
	return useQuery(['room', id], () => fetchRoomById(id), {
		enabled: !!id, // Only run the query if id is not null or undefined
	});
};
