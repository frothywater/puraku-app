import React, { Component } from "react";
import { Button } from "@material-ui/core";

const ipcRenderer = window.require("electron").ipcRenderer;

export default class FavoritesPage extends Component {
  render() {
    return (
      <Button variant="contained" color="primary">
        HELLO
      </Button>
    );
  }
}
