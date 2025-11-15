import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Social API Documentation",
      version: "1.0.0",
      description: "API cho ứng dụng mạng xã hội",
    },

    // ⚠ PHẢI ĐÚNG VỊ TRÍ NÀY — NGAY SAU info, KHÔNG LỆCH NGOẶC
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:5001",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },

  apis: ["./src/modules/**/*.route.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
