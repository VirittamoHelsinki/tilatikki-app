import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  useNavigation,
  useLocation,
  // redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Premise } from "./pages/Premise";
import { Header } from "~/@/components/Header";

import { store } from "~/Redux/store";
import { AuthChecker } from "~/utils/AutoChecker";
// import { useTypedSelector } from "./hooks/useTypedSelector";
// import { getMe } from "~/Redux/Reducers/UserReducer/userActions";

// async function Loader() {
//   getMe();
//   const user = useTypedSelector((state) => state.user.currentUser);
//   if (!user) {
//     return redirect("/login");
//   }
//   return;
// }
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // loader: Loader,
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
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </Provider>
  );
}
