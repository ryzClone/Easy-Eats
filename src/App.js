import "./App.css";
import { Route, Routes } from "react-router-dom";
import EasyEats from "./components/East-eats";
import Home from "./components/home-page";
import Users from "./components/users-page";
import Catigories from "./components/catigories-pge";
import Meals from "./components/meals-page";
import Error from "./components/Error";
import LoginPage from "./components/login-page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/easy-eats" element={<EasyEats />}>
        <Route index element={<Home />} />
        <Route path="/easy-eats/users" element={<Users />} />
        <Route path="/easy-eats/catigories" element={<Catigories />} />
        <Route path="/easy-eats/meals" element={<Meals />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
