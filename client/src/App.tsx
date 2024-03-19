import {
  Outlet,
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Premise from "./pages/Premise";
import { Header } from "~/@/components/Header";

import { store } from "~/Redux/store";
import { Profile } from "./pages/Settings";
import { useTypedSelector } from "./hooks/useTypedSelector";
import Cookies from "universal-cookie";
import { setToken, logoutUser } from "./Redux/Reducers/UserReducer/userActions";
import { useEffect, useState } from "react";


const Layout: React.FC = () => {
  const { currentUser, isLoading } = useTypedSelector(
    state => state.user,
  )

  const cookies = new Cookies;
  const [authToken, setAuthToken] = useState(cookies.get("tilatikkiToken"))

  useEffect(() => {
    return () => cookies.addChangeListener((val) => {
      console.log("Token update")
      if (val.name === "token" || val.name === "tilatikkiToken") {
        setToken(val.value)
        setAuthToken(val.value)
        console.log("Token updated")
      }
    })
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!currentUser) {
    return <div>NO CURRENT USER</div>
  }

  if (!authToken) {
    logoutUser()
    return <Navigate to="/login" />
  }

  return (
    <div className="relative flex h-screen w-screen flex-col">
      <Header />
      <Outlet />
      <footer className="flex p-4 sm:px-8">
        <span>
          Created by &hearts;{" "}
          <a href="/" className="font-bold">
            Virittämö
          </a>
        </span>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="premises/:id" index element={<Premise />} />
            <Route path="settings" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}
