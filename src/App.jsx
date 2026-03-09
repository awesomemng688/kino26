import React from "react";
import Home from './Pages/Home';
import MovieList from "./Pages/MovieList";
import MovieDetail from "./Pages/Detail/MovieDetail";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import {Switch, Route, Redirect} from "react-router-dom";

function App() {
  return (
    <>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/:category" component={MovieList}/>
        <Route exact path="/:category/:id" component={MovieDetail}/>
        <Redirect to="/"/>
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
