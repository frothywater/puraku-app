const net = require("net");
const port = process.env.PORT ? process.env.PORT - 100 : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () =>
    client.connect({ port: port }, () => {
        client.end();
        if (!startedElectron) {
            console.log("starting electron");
            startedElectron = true;
            const { exec } = require("child_process");
            const electron = exec("npm run electron");
            electron.stdout.on("data", data => {
                console.log(`stdout: ${data}`);
            });
            electron.stderr.on("data", data => {
                console.log("\x1b[31m%s\x1b[0m", `stderr: ${data}`);
            });
        }
    });

tryConnection();

client.on("error", error => {
    setTimeout(tryConnection, 1000);
});
