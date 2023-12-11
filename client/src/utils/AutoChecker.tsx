import { useEffect } from "react";
import Cookies from "universal-cookie";
import { setToken } from "~/Redux/Reducers/UserReducer/userActions";
import { useUserAction } from "~/hooks/useUser";

export function AuthChecker() {
  const { getMe } = useUserAction();

  useEffect(() => {
    const cookies = new Cookies();
    async function autoLogin() {
      const tilatikkiCookie = cookies.get("tilatikkiToken");
      setToken(tilatikkiCookie);

      if (tilatikkiCookie) {
        getMe();
      }
    }
    console.log("Cookie exists", cookies.get("tilatikkiToken") ? "YES" : "NO");
    autoLogin();
  }, [getMe]);

  return null; // This component doesn't render anything
}
