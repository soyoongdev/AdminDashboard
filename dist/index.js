"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = require("./api/middleware/express-formatter/index");
const index_2 = __importDefault(require("./api/routes/index"));
dotenv_1.default.config();
const { PORT } = process.env;
const app = (0, express_1.default)();
// Accept json body request
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// (helmet) helps secure Express apps by setting HTTP response headers.
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
// (morgan) HTTP request logger middleware for node.js
app.use((0, morgan_1.default)('dev'));
// (cors) Provide some options Headers for accept others localhost to allow request
app.use((0, cors_1.default)());
// Handle custom formatter response express (middleware)
app.use((0, index_1.responseEnhancer)());
/* ROUTES */
app.use('/api', index_2.default);
try {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT} : localhost:${PORT}`);
    });
}
catch (error) {
    console.log(`Server start error: ${error}`);
}
