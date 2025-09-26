import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerSetup = (app, BaseUrl) => {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Dripy API",
        version: "1.0.0",
        description: "MVP API documentation for Dripy.",
      },
      servers: [{ url: `${BaseUrl}/api` }],
    },
    apis: ["./routes/*.js"], // adjust path if needed
  };

  const swaggerSpec = swaggerJSDoc(swaggerOptions);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};

export default swaggerSetup;
