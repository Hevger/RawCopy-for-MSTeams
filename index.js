const { app, BrowserWindow, Menu, Tray } = require("electron");
const path = require("path");
const url = require("url");
const spawnSync = require("child_process").spawnSync;
const clipboardListener = require("clipboard-event");
const { clipboard } = require("electron");
const activeWindows = require("electron-active-window");
const AutoLaunch = require("auto-launch");

// Add to startup
var rawCopyMSTeams = new AutoLaunch({
  name: "RawCopyMSTeams",
});

rawCopyMSTeams
  .isEnabled()
  .then(function (isEnabled) {
    if (isEnabled) {
      return;
    }
    rawCopyMSTeams.enable();
  })
  .catch(function (err) {
    console.log(err);
  });

app.once("ready", () => {
  // Tray icon
  tray = new Tray(path.join(__dirname, "icon.ico"));
  tray.setToolTip("RawCopy for MSTeams");

  var contextMenu = Menu.buildFromTemplate([
    {
      label: "Quit",
      role: "quit",
      type: "normal",
    },
  ]);
  tray.setContextMenu(contextMenu);

  service = new BrowserWindow({
    width: 80,
    height: 60,
    center: true,
    minimizable: false,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      webSecurity: true,
      sandbox: true,
    },
    icon: "icon.ico",
  });

  service.loadURL(
    url.format({
      pathname: path.join(__dirname, "background.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  // Detect changes in clipboard
  clipboardListener.startListening();
  clipboardListener.on("change", async (data) => {
    // Only clean text if the text is copied from teams
    activeWindows()
      .getActiveWindow()
      .then((result) => {
        if (result.windowClass === "Teams.exe") {
          // Get clipboard
          const clipboardData = clipboard.readText();
          // Regex
          let pattern = /\[(.*?)\].*/;
          var lines = clipboardData.split("\n");
          //   Check if format is teams format
          if (pattern.test(lines[0])) {
            // Delete the first line
            lines.splice(0, 1);
            var newtext = lines.join("\n");
            clipboard.writeText(newtext);
          }
        }
      });
  });

  service.on("close", () => {
    app.quit();
    service = null;
  });
});
