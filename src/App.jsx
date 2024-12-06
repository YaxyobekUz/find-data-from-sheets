import React, { useEffect } from "react";

// Router
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import History from "./pages/History";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Telegram web app
import useTelegram from "./hooks/useTelegram";

const App = () => {
  const { tg } = useTelegram();
  useEffect(() => tg.setHeaderColor("#fff"), []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="history" element={<History />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
