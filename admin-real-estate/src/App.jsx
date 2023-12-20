import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
// import AdminRouter from './components/AdminRouter'
import PrivateRouter from "./components/PrivateRouter";
import ForceRedirect from "./components/ForceRedirect";
import { useAuthContext } from "./hooks/useAuthContext";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";
import Properties from "./pages/Properties";
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import Agents from "./pages/Agents";

function App() {
  const { user, isSuccess } = useAuthContext();
  const userState = {
    user,
    isSuccess,
  };
  const location = useLocation();
  const showNavBar = location.pathname !== "/login"; // Hide NavBar on Login page

  return (
    <div className='app'>
      <Toaster position='top-center' reverseOrder={false} />
      {showNavBar && <NavBar />}

      <Routes>
        <Route
          path='/login'
          element={
            <ForceRedirect user={userState}>
              <Login />
            </ForceRedirect>
          }
        />

        <Route
          path='/'
          element={
            <PrivateRouter user={userState}>
              <Properties />
            </PrivateRouter>
          }
        />
        <Route
          path='/dashboard'
          element={
            <PrivateRouter user={userState}>
              <Dashboard />
            </PrivateRouter>
          }
        />
        <Route
          path='/messages'
          element={
            <PrivateRouter user={userState}>
              <Messages />
            </PrivateRouter>
          }
        />
        <Route
          path='/agents'
          element={
            <PrivateRouter user={userState}>
              <Agents />
            </PrivateRouter>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
