import './App.css';
import StarwarsContextProvider from "./context/Context";
import {MainLayout} from "./layouts/MainLayout";
import Films from "./pages/Films";
import Planets from "./pages/Planets";
import Species from "./pages/Species";
import Starship from "./pages/Starship";
import Vehicles from "./pages/Vehicles";
import Home from "./pages/Home";
import People from "./pages/People";
import {
  BrowserRouter,
  createBrowserRouter, Route,
  RouterProvider, Routes,
} from "react-router-dom";


const router  = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home/> },
      { path: 'home', element: <Home/> },
      { path: 'films', element: <Films/> },
      { path: 'people', element: <People/> },
      { path: 'Planets', element: <Planets/> },
      { path: 'species', element: <Species/> },
      { path: 'starship', element: <Starship/> },
      { path: 'vehicles', element: <Vehicles/> },
    ]
  }
]);

function App() {

  return (
      <StarwarsContextProvider>
        <RouterProvider router={router} />
      </StarwarsContextProvider>
  );
}

export default App;
