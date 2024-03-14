import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  useNavigation,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Premise } from "./pages/Premise";
import FilterForm from "./pages/FilterForm";
import { Header } from "~/@/components/Header";

import { store } from "~/Redux/store";
import { AuthChecker } from "~/utils/AutoChecker";
import { Profile } from "./pages/Settings";
import { Loader2 } from "lucide-react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "premises/:id",
        children: [
          {
            index: true,
            element: <Premise />,
          },
        ],
      },
      {
        path: "filter",
        element: <FilterForm />,
      },
      {
        path: "settings",
        element: <Profile />,
      },
    ],
  },
]);

function Layout() {
  const navigation = useNavigation();
  const { pathname } = useLocation();
  return (
    <>
      {pathname === "/login" || pathname === "/register" ? (
        <Outlet />
      ) : (
        <div className="relative flex h-screen w-screen flex-col">
          <Header />
          {navigation.state !== "idle" && <p>Navigation in progress...</p>}
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
      )}
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AuthChecker />
      <RouterProvider
        router={router}
        fallbackElement={<Loader2 className="animate-spin" />}
      />
    </Provider>
  );
}
