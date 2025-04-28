import express from "express";
import swaggerUi from "swagger-ui-express";

(async () => {
  try {
    await import("./config/config.js");
    console.log("🔎 server.ts har laddats");

    const userRoute = (await import("./routes/userRoutes.js")).default;
    const noteRoute = (await import("./routes/noteRoutes.js")).default;
    const { swaggerDocs } = await import("./config/swagger.js");

    const app = express();
    app.use(express.json());

    const port = process.env.PORT || 3030;
    app.use("/api", userRoute);
    app.use("/api", noteRoute);
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    app.listen(port, () => {
      console.log(`Servern körs på ${port}`);
    });
  } catch (err) {
    console.error("Startup-fel:", err);
    process.exit(1);
  }
})();
