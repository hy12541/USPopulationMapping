import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "./App.css";
import Home from "./components/home/home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./components/about/about";
import History from "./components/history/history";
import Header from "./components/header/header";
import Map from "./components/map/map";

function App() {
  return (
    <main>
      <Router>
        <Header></Header>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/history">
            <History />
          </Route>
        </Switch>
        <footer className="text-center">
          <hr />
          <p>©Copyright | All rights reserved</p>
          <p>Data collection, Data Analysis: Yuanjie Jin, Zhewen Huang, Huan Wang, Wenqi Jia</p>
          <p>Data Visualization: Yun Hou</p>
          <p>Backend, Database and Website: Yong Wang</p>
        </footer>
      </Router>
    </main>
  );
}

export default App;
