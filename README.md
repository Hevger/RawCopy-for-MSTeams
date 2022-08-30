# RawCopy for MSTeams

The clipboard behavior in Microsoft Teams is very strange when you copy a message the sender's name and timestamp are being appended to your clipboard, but as a developer, we send code, passwords, etc.. to each other every day, it can be very annoying to have a text file opened just to delete the sender's name from the clipboard.

Because Microsoft doesn't have an option you can toggle to disable that, I have made a tool that cleans the sender's name and timestamp from the clipboard when you copy text from any conversation in Microsoft Teams.

---

## For end-users

You can download a ready-to-use build of this tool by clicking [here](https://github.com/Hevger/RawCopy-for-MSTeams/releases/tag/1.0.0 "here").

## For developers

##### This tool is made by ElectronJS.

To get started install NPM packages:
`npm i --also=dev`

Run
`npm start`

Build
`npm run dist`

---

#### Credits:

[auto-launch](https://www.npmjs.com/package/auto-launch "auto-launch")
[clipboard-event](https://www.npmjs.com/package/clipboard-event "clipboard-event")
[electron-active-window](https://www.npmjs.com/package/electron-active-window "electron-active-window")
