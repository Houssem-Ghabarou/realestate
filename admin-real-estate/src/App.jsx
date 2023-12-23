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
import AddProperty from "./pages/AddProperty";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();
  const showNavBar = location.pathname !== "/login"; // Hide NavBar on Login page

  return (
    <div className='app'>
      <Toaster
        position='top-center'
        reverseOrder={false}
        toastOptions={{
          // Define default options
          // className: "",
          // duration: 5000,
          style: {
            background: "#4c4c4d",
            color: "#fff",
          },

          success: {
            duration: 6000,
            theme: {
              primary: "rgba(211, 148, 33, 0.78)",
              // secondary: "black",
            },
          },
        }}
      />
      {showNavBar && <NavBar />}
      <Routes>
        <Route
          path='/login'
          element={
            <ForceRedirect>
              <Login />
            </ForceRedirect>
          }
        />

        <Route
          path='/'
          element={
            <PrivateRouter>
              <Properties />
            </PrivateRouter>
          }
        />
        <Route
          path='/dashboard'
          element={
            <PrivateRouter>
              <Dashboard />
            </PrivateRouter>
          }
        />
        <Route
          path='/messages'
          element={
            <PrivateRouter>
              <Messages />
            </PrivateRouter>
          }
        />
        <Route
          path='/agents'
          element={
            <PrivateRouter>
              <Agents />
            </PrivateRouter>
          }
        />
        <Route
          path='/ajouter-un-bien'
          element={
            <PrivateRouter>
              <AddProperty />
            </PrivateRouter>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
