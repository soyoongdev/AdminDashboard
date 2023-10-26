"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const info = (namespace, message, object) => {
    if (object) {
        console.info(`👉[${getTimeStamp()}] [🟢INFO] [${namespace}] ${message} \n`, object);
    }
    else {
        console.info(`👉[${getTimeStamp()}] [🟢INFO] [${namespace}] ${message} \n`);
    }
};
const warn = (namespace, message, object) => {
    if (object) {
        console.warn(`👉[${getTimeStamp()}] [🟡WARN] [${namespace}] ${message} \n`, object);
    }
    else {
        console.warn(`👉[${getTimeStamp()}] [🟡WARN] [${namespace}] ${message} \n`);
    }
};
const error = (namespace, message, object) => {
    if (object) {
        console.error(`👉[${getTimeStamp()}] [🔴ERROR] [${namespace}] ${message} \n`, object);
    }
    else {
        console.error(`👉[${getTimeStamp()}] [🔴ERROR] [${namespace}] ${message} \n`);
    }
};
const debug = (namespace, message, object) => {
    if (object) {
        console.debug(`👉[${getTimeStamp()}] [🔵DEBUG] [${namespace}] ${message} \n`, object);
    }
    else {
        console.debug(`👉[${getTimeStamp()}] [🔵DEBUG] [${namespace}] ${message} \n`);
    }
};
const getTimeStamp = () => {
    return new Date().toISOString();
};
exports.default = { info, warn, error, debug };
