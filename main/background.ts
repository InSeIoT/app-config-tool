import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import * as pty from 'node-pty';
import os from 'os';

const isProd: boolean = process.env.NODE_ENV === 'production';
const shell = os.platform() === "win32" ? "powershell.exe" : "bash";

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  var ptyProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
  });

  console.log("cwd", process.env.HOME);
  console.log("env", process.env);

  ptyProcess.onData(function(data) {
      mainWindow.webContents.send("terminal.incomingData", data);
      // console.log("Data sent");
  });

  ipcMain.on("terminal.keystroke", (event, key) => {
      console.log(`Keystroke: ${key}`);
      ptyProcess.write(key);
  });


  if (isProd) {
    await mainWindow.loadURL('app://.html');
  } else {
    const port = process.argv[2];
    console.log("Web port: ", port)
    await mainWindow.loadURL(`http://localhost:${port}`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});
