import { useMutation, useQueryClient } from "react-query";
const dev = true;

const API_URL = dev ? "http://localhost:5050" : "https://tilatikki-app-server.onrender.com";


// Create a new reservation
export const createReservation = async (reservationData) => {
  try {
    console.log("Creating reservation with data:", reservationData);
    const response = await fetch(`${API_URL}/reservations/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    });
    const responseData = await response.json();
    if (!response.ok) {
      console.error("Server response:", responseData);
      throw new Error("Failed to create reservation");
    }
    return responseData;
  } catch (error) {
    console.error("Create reservation error:", error);
    throw error;
  }
};

export const getReservations = async () => {
  try {
    const response = await fetch(`${API_URL}/reservations/`);
    const responseData = await response.json();

    if (!response.ok) {
      console.error("Server response:", responseData);
      throw new Error("Failed to fetch reservations");
    }

    return responseData;
  } catch (error) {
    console.error("Fetch reservations error:", error);
    throw error;
  }
};

export const deleteReservation = async (reservationId) => {
  try {
    const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
      method: "DELETE",
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Server response:", responseData);
      throw new Error("Failed to delete reservation");
    }

    return responseData;
  } catch (error) {
    console.error("Delete reservation error:", error);
    throw error;
  }
};

export const deleteReservationByGroupId = async (reservationGroupId) => {
  try {
    const response = await fetch(
      `${API_URL}/reservationsByGroupId/${reservationGroupId}`,
      {
        method: "DELETE",
      },
    );

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Server response:", responseData);
      throw new Error("Failed to delete reservation");
    }

    return responseData;
  } catch (error) {
    console.error("Delete reservation error: ", error);
    throw error;
  }
};

export const updateReservation = async (reservationId, updatedData) => {
  try {
    console.log(`Updating reservation with ID: ${reservationId}`, updatedData);
    const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Server response:", responseData);
      throw new Error("Failed to update reservation");
    }

    return responseData;
  } catch (error) {
    console.error("Update reservation error:", error);
    throw error;
  }
};

export const useCreateReservationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(createReservation, {
    onSuccess: () => {
      // Invalidate and refetch reservations query or related queries if necessary
      queryClient.invalidateQueries("reservations");
    },
    onError: (error) => {
      console.error("Create reservation mutation error:", error);
    },
  });
};

export const useUpdateReservationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ reservationId, updatedData }) =>
      updateReservation(reservationId, updatedData),
    {
      onSuccess: () => {
        // Invalidate and refetch reservations query or related queries if necessary
        queryClient.invalidateQueries("reservations");
      },
      onError: (error) => {
        console.error("Update reservation mutation error:", error);
      },
    },
  );
};

export const useDeleteReservationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteReservation, {
    onSuccess: () => {
      // Invalidate and refetch reservations to reflect the changes in the UI
      queryClient.invalidateQueries("reservations");
    },
    onError: (error) => {
      console.error("Delete reservation mutation error:", error);
    },
  });
};

export const useDeleteReservationByGroupIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteReservationByGroupId, {
    onSuccess: () => {
      // Invalidate and refetch reservations to reflect the changes in the UI
      queryClient.invalidateQueries("reservations");
    },
    onError: (error) => {
      console.error("Delete reservation mutation error:", error);
    },
  });
};
