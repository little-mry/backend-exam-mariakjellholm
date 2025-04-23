import express from "express";
import swaggerUi from "swagger-ui-express";

import userRouter from "./routes/userRoutes.js";
import noteRouter from "./routes/noteRoutes.js";


const app = express();
app.use(express.json());

const port = process.env.PORT || 3030;

app.use("/api", noteRouter);
app.use("/api", userRouter);

app.listen(port, () => {
  console.log(`Servern körs på ${port}`);
});
