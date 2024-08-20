// api/schools.js
<<<<<<< HEAD
import { useQuery } from 'react-query';

const dev = true;

const API_URL = dev ? "http://localhost:5050" : "https://tilatikki-app-server.onrender.com";
=======
import { useQuery } from "react-query";
const dev = true;
const API_URL = dev
  ? "http://localhost:5050"
  : "https://tilatikki-app-server.onrender.com";
>>>>>>> 0d3dfe7e568b925db4935efc03d6832a49bdcf44

// Fetch all schools
export const fetchAllSchools = async () => {
  try {
    const response = await fetch(`${API_URL}/schools`);
    if (!response.ok) {
      throw new Error("Failed to fetch schools data");
    }
    return response.json();
  } catch (error) {
    console.error("Fetch schools data error:", error);
    throw error;
  }
};

// Fetch a school by ID
export const fetchSchoolById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/schools/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch school data");
    }
    return response.json();
  } catch (error) {
    console.error("Fetch school data error:", error);
    throw error;
  }
};

// Hook to fetch all schools
export const useAllSchoolsQuery = () => {
  return useQuery("schools", fetchAllSchools);
};

// Hook to fetch a school by ID
export const useSchoolQuery = (id) => {
  return useQuery(["school", id], () => fetchSchoolById(id), {
    enabled: !!id, // Only run the query if id is not null or undefined
  });
};
