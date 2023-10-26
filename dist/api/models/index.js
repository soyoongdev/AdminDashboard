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
exports.closeConnection = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const database_config_1 = require("../../config/database.config");
const logging_1 = __importDefault(require("../utils/logging"));
const NAMESPACE = 'model/index';
const { database, host, username, password } = database_config_1.mysqlConfig.development;
const sequelize = new sequelize_typescript_1.Sequelize(database, username, password, {
    host: host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize
            .authenticate()
            .then(() => {
            logging_1.default.info(NAMESPACE, 'Connection has been established successfully. 👏');
        })
            .catch((error) => logging_1.default.error(NAMESPACE, `Unable to connect to the database: ${error}`));
        yield sequelize.sync();
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, 'Failed to connect to database');
    }
});
const closeConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize
            .close()
            .then(() => logging_1.default.info(NAMESPACE, 'Connection has been closed'))
            .catch((error) => logging_1.default.error(NAMESPACE, `Unable to close the database: ${error}`));
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, 'Failed to closed connect database');
    }
});
exports.closeConnection = closeConnection;
exports.default = sequelize;
