import "./App.css";
import { Route, Routes } from "react-router-dom";
import EasyEats from "./components/East-eats";
import Home from "./components/home-page";
import Users from "./components/users-page";
import Catigories from "./components/catigories-pge";
import Error from "./components/Error";
import LoginPage from "./components/login-page";
import CatMeals from "./components/catalog-components/cat-meals";
import CatFoods from "./components/catalog-components/foods";
import CatFoot from "./components/catalog-components/cat-food";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/easy-eats" element={<EasyEats />}>
        <Route index element={<Home />} />
        <Route path="/easy-eats/users" element={<Users />} />
        <Route path="/easy-eats/catigories" element={<Catigories />} />
        <Route path="/easy-eats/catigories-food" element={<CatFoot />} />
        <Route path="/easy-eats/catigories-meals" element={<CatMeals />} />
        <Route path="/easy-eats/foods" element={<CatFoods />} />
      </Route>

      {/* Agar noto'g'ri URL kiritsangiz, bu error sahifasiga yo'naltiradi */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
