import { Outlet } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="App">
      <Outlet />
      <AppRoutes />
    </div>
  );
}

export default App;
