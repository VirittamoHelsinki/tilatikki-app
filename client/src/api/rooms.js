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

export const fetchTotalPeopleReserved = async (roomId) => {
	try {
		const response = await fetch(`${API_URL}/rooms/${roomId}/total-people`);
		if (!response.ok) {
			throw new Error('Failed to fetch total people reserved');
		}
		return response.json();
	} catch (error) {
		console.error('Fetch total people reserved error:', error);
		throw error;
	}
};

// React Query hook for fetching total people reserved
export const useTotalPeopleReservedQuery = (roomId) => {
	return useQuery(['totalPeopleReserved', roomId], () => fetchTotalPeopleReserved(roomId), {
		enabled: !!roomId, // Only run the query if roomId is not null or undefined
	});
};
