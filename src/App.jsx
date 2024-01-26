import { Navigate, Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"
import Login from "./pages/Login"
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import DefaultLayout from "./layout/DefaultLayout";
import Cart from "./pages/Cart";

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);

  if (auth.token === null) {
    return <Navigate to="/login" />
  }

  return children;
}

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </>
  )
}

export default App