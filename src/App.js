import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Spots from "./pages/Spots";
import Riders from "./pages/Riders";
import Records from "./pages/Records";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import MyProfile from "./pages/MyProfile";
import MySessions from "./pages/MySessions";
import SessionDetail from "./pages/SessionDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/Spots", element: <Spots /> },
      { path: "/Riders", element: <Riders /> },
      { path: "/Records", element: <Records /> },
      { path: "/MyProfile", element: <MyProfile /> },
      { path: "/MySessions", element: <MySessions /> },
      { path: "/Sessions/:sessionId", element: <SessionDetail /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
