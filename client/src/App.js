import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SearchResultProvider } from "./context/SearchContext";
import { CurrencyProvider } from "./context/currencyContext";
import { Redirect } from "react-router-dom/";
import LoadingBar from "react-top-loading-bar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import Search from "./components/Search";
import Home from "./components/Home";
import Contact from "./components/Contact";
import About from "./components/About";
import Vente from "./components/Vente";
import Location from "./components/Location";
import FlatDetail from "./components/FlatDetail";
import PropByCatType from "./components/PropByCatType";
import NotFound from "./components/NotFound";
import WhatsApp from "./components/WhatsApp";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
function App() {
  const [progress, setProgress] = useState(0);

  return (
    <SearchResultProvider>
      <CurrencyProvider>
        <HelmetProvider>
          <Router>
            <Toaster
              position="top-right"
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
                    primary: "#DAA520",
                    // secondary: "black",
                  },
                },
              }}
            />
            <LoadingBar
              color="#DAA520"
              progress={progress}
              onLoaderFinished={() => setProgress(0)}
              height={4}
              waitingTime={300}
            />
            <div className="App">
              <WhatsApp />
              <Route
                path={[
                  "/vente/:anything*",
                  "/location/:anything*",
                  "/about",
                  "/contact",
                  "/bien/details/*",
                  "/404",
                ]}
                render={(props) => (
                  <Header {...props} type={0} setProgress={setProgress} />
                )}
              />

              <Route
                path="/"
                exact
                render={(props) => (
                  <Banner {...props} setProgress={setProgress} />
                )}
              />

              <Route
                path={["/vente/:anything*", "/location/:anything*"]}
                exact
                render={(props) => (
                  <Search {...props} type={0} setProgress={setProgress} />
                )}
              />

              <Switch>
                <Route
                  path="/"
                  exact
                  render={(props) => (
                    <Home {...props} setProgress={setProgress} />
                  )}
                ></Route>
                <Route
                  exact
                  path="/contact"
                  render={(props) => (
                    <Contact {...props} setProgress={setProgress} />
                  )}
                ></Route>
                <Route
                  exact
                  path="/about"
                  render={(props) => (
                    <About {...props} setProgress={setProgress} />
                  )}
                ></Route>
                <Route
                  exact
                  path="/vente"
                  render={(props) => (
                    <Vente {...props} setProgress={setProgress} />
                  )}
                />
                <Route
                  exact
                  path="/location"
                  render={(props) => (
                    <Location {...props} setProgress={setProgress} />
                  )}
                />
                <Route
                  exact
                  path="/bien/details/:propIdName"
                  render={(props) => (
                    <FlatDetail {...props} setProgress={setProgress} />
                  )}
                />
                <Route
                  exact
                  path="/:category/:proptype"
                  render={(props) => (
                    <PropByCatType
                      {...props}
                      setProgress={setProgress}
                      progress={progress}
                    />
                  )}
                />

                <Route path="/404" component={NotFound}></Route>
                <Route>
                  <Redirect to="/404" />
                </Route>
              </Switch>

              <Footer />
            </div>
          </Router>
        </HelmetProvider>
      </CurrencyProvider>
    </SearchResultProvider>
  );
}

export default App;
