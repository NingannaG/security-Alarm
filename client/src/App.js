import Body from "./components/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { useState } from "react";
import useSocketConnection from "./hooks/useSocketConnection";

const App = () => {
  const [data, setData] = useState([]);
  useSocketConnection(setData);
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body data={data}></Body>,
    },
    {
      path: "/dashboard/:id",
      element: <Dashboard></Dashboard>,
    },
  ]);
  return <RouterProvider router={appRouter}></RouterProvider>;
};

export default App;
