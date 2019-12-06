import React, { Component } from "react";
import { Button } from "@material-ui/core";

const { ipcRenderer: ipc } = window.require("electron");

export default class FavoritesPage extends Component {
  render() {
    return (
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    );
  }
}

async function handleLogin() {
  ipc.send("login-twitter");
}
