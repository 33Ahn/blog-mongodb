import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        </Routes>
        <Routes>
        <Route
          path="/register"
          element={user ? <Home /> : <Register />}
        ></Route>
        </Routes>
        <Routes>
        <Route path="/login" element={user ? <Home /> : <Login />}></Route>
        </Routes>
        <Routes>
        <Route path="/write" element={user ? <Write /> : <Register />}></Route>
        </Routes>
        <Routes>
          <Route>
            
          </Route>
        </Routes>
        <Routes>
        <Route path="/post/:postId" element={<Single />}></Route>
        </Routes>


    </Router>
  );
}

export default App;
