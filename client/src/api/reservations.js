import { useMutation, useQueryClient } from 'react-query';
const API_URL = 'http://localhost:5050';

// Create a new reservation
export const createReservation = async (reservationData) => {
	try {
		console.log('Creating reservation with data:', reservationData);
		const response = await fetch(`${API_URL}/reservations/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(reservationData),
		});
		const responseData = await response.json();
		if (!response.ok) {
			console.error('Server response:', responseData);
			throw new Error('Failed to create reservation');
		}
		return responseData;
	} catch (error) {
		console.error('Create reservation error:', error);
		throw error;
	}
};

export const useCreateReservationMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(createReservation, {
		onSuccess: () => {
			// Invalidate and refetch reservations query or related queries if necessary
			queryClient.invalidateQueries('reservations');
		},
		onError: (error) => {
			console.error('Create reservation mutation error:', error);
		},
	});
};
