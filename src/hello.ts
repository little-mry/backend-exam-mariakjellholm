console.log(' TS-loader funkar!');

import "./config/config.js";
console.log("🔎 server.ts har laddats");
import express from "express";
import swaggerUi from "swagger-ui-express";

import userRoute from "./routes/userRoutes.js";
/* import noteRoute from './routes/noteRoutes.js' */

const app = express();
app.use(express.json());

const port = process.env.PORT || 3030;

app.use("/api", userRoute);
/* app.use("/api", noteRoute); */

app.listen(port, () => {
  console.log(`Servern körs på ${port}`);
});
