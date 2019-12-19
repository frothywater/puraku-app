import React, { Component } from "react";
import { Button } from "@material-ui/core";

const { ipcRenderer: ipc } = window.require("electron");

export default class FavoritesPage extends Component {
  render() {
    return (
      <div>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
        <Button variant="contained" color="primary" onClick={handleFavorites}>
          Favorites
        </Button>
      </div>
    );
  }
}

async function handleLogin() {
  ipc.send("login-twitter");
}

async function handleFavorites() {
  ipc.send("get-favorites");
}
