import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import lusca from "lusca";
import router from "./routes";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));


app.use('/api/v1/', router); // routes

export default app;
