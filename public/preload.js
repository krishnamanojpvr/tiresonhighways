// preload.js

const { contextBridge, ipcRenderer } = require('electron');

// Expose certain Electron APIs to the renderer process
contextBridge.exposeInMainWorld('electronApi', {
  sendToMain: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receiveFromMain: (channel, listener) => {
    ipcRenderer.on(channel, (event, ...args) => listener(...args));
  },
});