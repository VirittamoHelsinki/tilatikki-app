import { useEffect } from "react";
import Cookies from "universal-cookie";
import { setToken } from "../Redux/Reducers/UserReducer/userActions";
import { useUserAction } from "../hooks/useUser";

export const AuthChecker = () => {
  const { getMe } = useUserAction();
  const cookies = new Cookies();

  const autoLogin = async () => {
    const tilatikkiCookie = cookies.get("tilatikkiToken");
    setToken(tilatikkiCookie);

    if (tilatikkiCookie) {
      await getMe();
    }
  };

  useEffect(() => {
    console.log("Cookie exists", cookies.get("tilatikkiToken") ? "yes" : "no");
    autoLogin();
  }, []);

  return null; // This component doesn't render anything
};
