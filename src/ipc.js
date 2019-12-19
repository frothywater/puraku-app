"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
const puraku_1 = require("puraku");
const electron_1 = require("electron");
let windows = {};
module.exports.setWindow = function (name, window) {
    windows[name] = window;
};
module.exports.listen = function () {
    let twitter;
    let authWindow = windows["authWindow"];
    electron_1.ipcMain.on("login-twitter", async (event) => {
        if (twitter)
            return;
        await puraku_1.Settings.applySettings();
        twitter = new puraku_1.TwitterProvider();
        await twitter.init();
        const authUrl = twitter.getLoginRedirectUrl();
        console.log(authUrl);
        authWindow.loadURL(authUrl);
        authWindow.show();
        authWindow.webContents.on("will-navigate", async (e, callbakUrl) => {
            const verifier = url.parse(callbakUrl, true).query["oauth_verifier"];
            await twitter.login(verifier);
            authWindow.close();
        });
        authWindow.on("closed", function () {
            authWindow = null;
        });
    });
    electron_1.ipcMain.on("get-favorites", async (event) => {
        const favList = twitter.addList({ action: "getMyFavorites" });
        await favList.init();
        await favList.update();
        await favList.save();
    });
};
//# sourceMappingURL=ipc.js.map