# SunDash-Dashboard
NodeJS Electron Based Dashboard and a Arudino Xbee Reader

## TO-DO
- Config JS File
- Automatic COM Port searching
- Start and Install Scripts


## Bring Up Guide

### Requirments
- NodeJS
- Installed Depencidies
  - `npm install` in the root directory
- Web Browser (Chrome)
- Access to running command line
- The Reciver Unit

### Hardware
1. Plug in the reciver unit (small black box) into USB

### Installation
1. Download and extract the zip file (in release or "Download Zip" in GitHub) to a location you may access
2. Run the `install.bat` if on Windows (if this does not exist, see the **Manual Installation** section
3. Profit.

### Running
1. Once **Installed** run `run.bat`. This should start the server
2. If `run.bat` does not launch chrome, open a web browser and go to `localhost:3000`

### Manual Installation
1. Download and extract the zip file (in release or "Download Zip" in GitHub) to a location you may access
2. Open command promt (Windows Key + R, then type `cmd.exe`)
3. Navigate to the dashboard folder
  - `cd [folder]` to "open" a folder
  - `cd ..` move up a folder (for example `Documents/Folder` -> `Documents/`)
4. Run `npm install`

### Manual Running
2. Open command promt (Windows Key + R, then type `cmd.exe`)
3. Navigate to the dashboard folder (see above)
4. Run `npm start`(If this doesn't work, `node server.js`)
5. Open a web browser and go to `localhost:3000`


## Troubleshooting
### Cannot open serial port (COM_)
This means the assigned COM port inside the server isn't correct. The COM port defines where to talk to the reciver unit. We are working to have this be set automaticlly, but it may not be implemented or working correctly. If so we have to update it.
  - Open `config.js`
  - Edit the line `comPort=` to be the correct COM Port.
  - Save and relaunch the server
