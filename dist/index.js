"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_1 = require("./config/database");
const index_route_1 = __importDefault(require("./routes/admin/index.route"));
const index_route_2 = __importDefault(require("./routes/client/index.route"));
const system_1 = require("./config/system");
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const method_override_1 = __importDefault(require("method-override"));
(0, database_1.connect)();
const app = (0, express_1.default)();
const port = `${process.env.PORT}` || 3000;
app.use((0, method_override_1.default)('_method'));
app.set('views', `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express_1.default.static(`${__dirname}/public`));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use("/tinymce", express_1.default.static(path_1.default.join(__dirname, "node_modules", "tinymce")));
app.locals.prefixAdmin = system_1.systemConfig.prefixAdmin;
(0, index_route_1.default)(app);
(0, index_route_2.default)(app);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
