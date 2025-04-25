(async () => {
  try {
    await import("./config/config.js"); 
    console.log("🔎 server.ts har laddats");

    const express = (await import("express")).default;
    const swaggerUi = (await import("swagger-ui-express")).default;
    const userRoute = (await import("./routes/userRoutes.js")).default;
    const noteRoute = (await import("./routes/noteRoutes.js")).default

    const app = express();
    app.use(express.json());

    const port = process.env.PORT || 3030;
    app.use("/api", userRoute);
    app.use("/api", noteRoute);

    app.listen(port, () => {
      console.log(`Servern körs på ${port}`);
    });
  } catch (err) {
    console.error("Startup-fel:", err);
    process.exit(1);
  }
})();