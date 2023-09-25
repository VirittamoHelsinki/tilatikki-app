import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  useNavigation,
  useLocation,
} from "react-router-dom";
import { Header } from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

// This import the BrowserRouter, Routes, and Route components from the react-router-dom library.
// These components are used to create a routing system for the application.

import { Provider } from "react-redux";
// This import the Provider component from the react-redux library.
// This component is used to connect the Redux store to the React application.

import { store } from "./Redux/store";
import { Premise } from "./pages/Premise";
import {AuthChecker} from "./components/AutoChecker";
// This import the store variable from the Redux/store.js file.
// This variable contains the Redux store for the application.
const loader = async () => {

  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader,
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
        path: ":slug",
        children: [
          {
            index: true,
            element: <Premise />,
          },
        ],
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
        <div className="flex flex-col flex-1 px-20 py-[50px]">
          <Header />
          {navigation.state !== "idle" && <p>Navigation in progress...</p>}
          <Outlet />
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AuthChecker />
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </Provider>
  );
}
