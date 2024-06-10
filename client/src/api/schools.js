// api/schools.js
import { useQuery } from 'react-query';
const API_URL = 'http://localhost:5050';

export const fetchSchool = async () => {
	try {
		const response = await fetch(`${API_URL}/schools`);
		if (!response.ok) {
			throw new Error('Failed to fetch school data');
		}
		return response.json();
	} catch (error) {
		console.error('Fetch school data error:', error);
		throw error;
	}
};

export const useSchoolQuery = () => {
	return useQuery('schools', fetchSchool);
};
