import { useQuery } from 'react-query';

export const fetchSchool = async () => {
	const response = await fetch('/api/schools');
	if (!response.ok) {
		throw new Error('Failed to fetch school data');
	}
	return response.json();
};

export const useSchoolQuery = () => {
	return useQuery('school', fetchSchool);
};
