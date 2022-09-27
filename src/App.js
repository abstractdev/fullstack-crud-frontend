import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import styles from "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { getUser } from "./features/userSlice";
import Protector from "./components/Protector";

function App() {
  //On app load, make api call to authorized getUser Route. If client already has cookie, they will be logged in, else server will reject.
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <Protector>
                <Dashboard />
              </Protector>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
