import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/reducers/authSlice";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(
      login({
        user: "emilio",
        token: "1234",
      })
    );
  };

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <button onClick={handleLogin}>Logout</button>
      <button onClick={handleLogout}>Logout</button>
      <div>
        token: {auth.token || "no token"}
        <br />
        user: {auth.user || "no user"}
      </div>
    </>
  );
}

export default App;
