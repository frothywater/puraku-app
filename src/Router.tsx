import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import FavoritesPage from "./FavoritesPage";
import Theme from "./Theme";

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <ThemeProvider theme={Theme}>
          <Route path="/" component={FavoritesPage} />
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}
