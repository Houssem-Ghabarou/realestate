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

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Route path={["/", "/vente", "/location"]} exact>
          <Banner />
        </Route>

        <Route path="/" exact component={Home}></Route>
        <Route path="/contact" component={Contact}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/vente" render={() => <FlatList type={1} />} />
        <Route path="/location" render={() => <FlatList type={2} />} />
        <Route
          path="/:category/:proptype"
          render={() => <FlatList type={5} />}
        />

        {/* <Route path="/blog" exact component={Blog}></Route> */}
        {/* <Route path="/blog/:id" component={BlogDetail}></Route> */}
        <Route path="/detailbiens/:id" component={FlatDetail}></Route>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
