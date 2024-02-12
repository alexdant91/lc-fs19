import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./components/router/pages/home";
import About from "./components/router/pages/About";
import Contact from "./components/router/pages/Contact";
import Login from "./components/router/pages/Login";
import Profile from "./components/router/pages/Profile";
import DefaultLayout from "./components/router/layout/DefaultLayout";
import ProfileLayout from "./components/router/layout/ProfileLayout";
import User from "./components/router/pages/User";

//il sistema di login/logout qui presente è da vedere solo a scopo didattico, si usa ridax per questo!!

const ProtectedRoute = ({ isLogged, children }) => {
  if (isLogged) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

const App = () => {
  const [isLogged, setIsLogged] = useState(false);

  const login = () => {
    setIsLogged(true);
  };

  const logout = () => {
    setIsLogged(false);
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<DefaultLayout logout={logout} isLogged={isLogged} />}
        >
          <Route path="" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login login={login} />} />
        </Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute isLogged={isLogged}>
              <ProfileLayout logout={logout} isLogged={isLogged} />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<Profile />} />
          <Route path=":user_id" element={<User />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

//https://example.com/product/12345
//https://example.com/product/:product_id

//https://example.com/product?product_id=12345
