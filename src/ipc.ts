import * as url from "url";
import { TwitterProvider, Settings } from "puraku";
import { ipcMain, BrowserWindow } from "electron";

let windows: {
    [name: string]: BrowserWindow;
} = {};

module.exports.setWindow = function(name: string, window: BrowserWindow) {
    windows[name] = window;
};

module.exports.listen = function() {
    let twitter: TwitterProvider;
    let authWindow = windows["authWindow"];

    ipcMain.on("login-twitter", async event => {
        if (twitter) return;

        await Settings.applySettings();
        twitter = new TwitterProvider();
        await twitter.init();
        const authUrl = twitter.getLoginRedirectUrl();
        console.log(authUrl);

        authWindow.loadURL(authUrl);
        authWindow.show();
        authWindow.webContents.on("will-navigate", async (e, callbakUrl) => {
            const verifier = url.parse(callbakUrl, true).query[
                "oauth_verifier"
            ] as string;
            await twitter.login(verifier);
            authWindow.close();
        });

        authWindow.on("closed", function() {
            authWindow = null;
        });
    });

    ipcMain.on("get-favorites", async event => {
        await Settings.applySettings();

        const favList = twitter.addList({ action: "getMyFavorites" });
        await favList.init();
        await favList.update();
        await favList.save();
    });
};
