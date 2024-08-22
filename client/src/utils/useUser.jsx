import { fetchUserDataByEmail } from "@/api/userApi";
import { useEffect } from "react";
import { getCookie } from "./Cookies";

const useUser = () => {
  const [ user, setUser ] = useState(null);
  
  useEffect(() => {
    const email = getCookie('UserEmail');
    if (email) {
      fetchUserDataByEmail(email)
        .then(setUser)
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
      }
    }, []);

  return user
}

export default useUser