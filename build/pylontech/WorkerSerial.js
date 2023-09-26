"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_debug = __toESM(require("debug"));
var import_serialport = require("serialport");
var import_WorkerAbstract = __toESM(require("./WorkerAbstract"));
const debugApi = (0, import_debug.default)("pylontech:api");
module.exports = class WorkerSerial extends import_WorkerAbstract.default {
  constructor(path, baudRate, debugData) {
    debugApi("MyWorkerNet.constructor", "path:", path, "baudRate:", baudRate);
    super();
    this._socket = new import_serialport.SerialPort({ path, baudRate });
    if (debugData)
      this._socket.on("data", debugData);
    this._socket.pipe(this._consolenReader);
    this._socket.open(this._connected.bind(this));
  }
  sendData(data) {
    debugApi("MyWorkerSerial.sendData", "data:", data.toString(), "this._activeCmd:", this._activeCmd);
    this._socket.write(data);
  }
  close() {
    debugApi("MyWorkerSerial.close");
    return new Promise((resolve) => {
      this._socket.close(() => {
        resolve(true);
      });
    });
  }
};
//# sourceMappingURL=WorkerSerial.js.map
