import "./App.css";
import FlatDetail from "./components/FlatDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Contact from "./components/Contact";
import About from "./components/About";
// import Blog from "./components/Blog";
// import BlogDetail from "./components/BlogDetail";
import FlatList from "./components/FlatList";
import Banner from "./components/Banner";
import Search from "./components/Search";
import { SearchResultProvider } from "./context/SearchContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Vente from "./components/Vente";
import Location from "./components/Location";
import PropByCatType from "./components/PropByCatType";
import NotFound from "./components/NotFound";
import backgroundVilla from "./assets/backgroundvilla.jpg";
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
              ,
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
