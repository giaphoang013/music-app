import express, { Express } from "express";
import env from "dotenv";
env.config();
import { connect } from "./config/database";
import adminRoutes from "./routes/admin/index.route";
import clientRoutes from "./routes/client/index.route";
import { systemConfig } from "./config/system";
import path from "path";
import bodyParser from "body-parser";
import methodOverride from "method-override";

connect();

const app: Express = express();
const port: (number | string) = `${process.env.PORT}` || 3000;

app.use(methodOverride('_method'));

app.set('views', `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// End TinyMCE

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

adminRoutes(app);
clientRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});



// import express, { Express } from "express";
// import * as database from "./config/database";
// import dotenv from "dotenv"
// dotenv.config();
// import clientRoutes from "./routes/client/index.route";
// import adminRoutes from "./routes/admin/index.route"
// import { systemConfig } from "./config/system";
// import path from "path";
// import bodyParser from "body-parser";


// database.connect();

// const app: Express = express();
// const port: number | string = process.env.PORT || 3000;


// app.use(express.static(`${__dirname}/public`));
// app.set('views', `${__dirname}/views`);
// app.set('view engine', 'pug');


// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// // TinyMCE
// app.use(
//   "/tinymce",
//   express.static(path.join(__dirname, "node_modules", "tinymce"))
// );
// // End TinyMCE

// // App Local Variables
// app.locals.prefixAdmin = systemConfig.prefixAdmin;

// // Admin Routes
// adminRoutes(app);

// // Client Routes
// clientRoutes(app);

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });

