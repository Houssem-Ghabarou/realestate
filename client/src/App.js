import "./App.css";
import React, { lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SearchResultProvider } from "./context/SearchContext";

// Lazy load components
const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));
const Banner = lazy(() => import("./components/Banner"));
const Search = lazy(() => import("./components/Search"));
const Home = lazy(() => import("./components/Home"));
const Contact = lazy(() => import("./components/Contact"));
const About = lazy(() => import("./components/About"));
const Vente = lazy(() => import("./components/Vente"));
const Location = lazy(() => import("./components/Location"));
const FlatDetail = lazy(() => import("./components/FlatDetail"));
const PropByCatType = lazy(() => import("./components/PropByCatType"));
const NotFound = lazy(() => import("./components/NotFound"));

function App() {
  return (
    <SearchResultProvider>
      <Router>
        <div className="App">
          <Route
            path={[
              "/vente/:anything*",
              "/location/:anything*",
              "/about",
              "/contact",
              "/detailbiens/*",
            ]}
          >
            <Header type={0} />
          </Route>
          <Route path="/" exact>
            <Banner />
          </Route>

          <Route path={["/vente/:anything*", "/location/:anything*"]} exact>
            <Search type={0} />
          </Route>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/contact" component={Contact}></Route>
            <Route path="/about" component={About}></Route>
            <Route exact path="/vente" component={Vente} />
            <Route exact path="/location" component={Location} />
            <Route exact path="/detailbiens/:id" component={FlatDetail}></Route>
            <Route
              exact
              path="/:category/:proptype"
              component={PropByCatType}
            />

            <Route component={NotFound}></Route>
          </Switch>

          <Footer />
        </div>
      </Router>
    </SearchResultProvider>
  );
}

export default App;
