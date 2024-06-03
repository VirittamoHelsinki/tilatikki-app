import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoggedIn = ({ redirectTo }) => {
  let navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = document.cookie.split(';').some(cookie => cookie.trim().startsWith('LoggedIn='));
    if (isLoggedIn) {
      navigate(redirectTo);
    }
  }, [navigate, redirectTo]);

  return null;
};

export default LoggedIn;