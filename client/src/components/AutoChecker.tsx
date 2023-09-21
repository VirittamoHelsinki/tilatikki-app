// AuthChecker.js
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { setToken } from "../Redux/Reducers/UserReducer/userActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useUserAction } from "../hooks/useUser";
import { redirect } from "react-router-dom";
import { get } from "http";

const AuthChecker = () => {
  const { getMe } = useUserAction();

const autoLogin = async () => {
    const cookies = new Cookies();
    const tilatikkiCookie = cookies.get("tilatikkiToken");
    setToken(tilatikkiCookie)

    if (tilatikkiCookie) {
        const user = await getMe()
      
        if (!user) {
        // Redirect if the user is not authenticated
        redirect("/login");
      }
    } else {
      // Redirect if no token exists
      redirect("/login");
    }
};


  useEffect(() => {
    autoLogin();
  }, []);

  return null; // This component doesn't render anything
};

export default AuthChecker;