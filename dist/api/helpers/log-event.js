"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const fs_1 = __importDefault(require("fs"));
const logging_1 = __importDefault(require("../utils/logging"));
const NAMESPACE = 'helpers/log-event';
const logEvent = (message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dateFormatted = `${(0, date_fns_1.format)(new Date(), 'dd/MM/yyyy|MM:SS:HH')}`;
        const content = `👉[UserID] [${dateFormatted}] : '${message}' \n`;
        fs_1.default.promises
            .appendFile('logs.log', content)
            .then(() => {
            logging_1.default.info(NAMESPACE, 'Error is logged');
        })
            .catch((err) => {
            if (err)
                throw err;
        });
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, `${error}`);
    }
});
exports.default = logEvent;
