const dev = true;
const API_URL = dev ? "http://localhost:5050" : "https://tilatikki-app-server.onrender.com";

export const fetchUserDataByEmail = async (email) => {
  try {
    const response = await fetch(`${API_URL}/userdata/${encodeURIComponent(email)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};


export const fetchUserById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/userdata/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return response.json();
  } catch (error) {
    console.error('Fetch user data error:', error);
    throw error;
  }
};


export const fetchAllUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/userdata`);
    if (!response.ok) {
      throw new Error('Failed to fetch users data');
    }
    const usersData = await response.json();
    return usersData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Failed to log in');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const deleteUser = async (email) => {
  try {
    const response = await fetch(`${API_URL}/deleteuser/${encodeURIComponent(email)}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const updateUser = async (email, newUserData) => {
  try {
    const response = await fetch(`${API_URL}/update/${encodeURIComponent(email)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserData)
    });

    if (!response.ok) {
      throw new Error('Failed to update user information');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating userdata:', error);
    throw error;
  }
}

export const updateUserPassword = async (email, newPasswordData) => {
  try {
    const response = await fetch(`${API_URL}/updatePassword/${encodeURIComponent(email)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPasswordData)
    });

    if (!response.ok) {
      throw new Error('Failed to update password');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating userdata:', error);
    throw error;
  }
}