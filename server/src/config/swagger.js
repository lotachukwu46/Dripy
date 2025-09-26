// src/config/swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const swaggerSetup = (app, baseUrl = "http://localhost:5000") => {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Dripy API",
        version: "1.0.0",
        description: "MVP API documentation for Dripy.",
      },
      servers: [{ url: `${baseUrl}/api` }],
    },
    apis: [path.join(process.cwd(), "src/routes/**/*.js")], // auto-load all routes
  };

  const swaggerSpec = swaggerJSDoc(swaggerOptions);

  // Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Raw swagger.json
  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  return swaggerSpec; // in case we want to log info
};

export default swaggerSetup;
