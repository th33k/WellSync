import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Dashboard}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
