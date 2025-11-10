import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Social API Documentation",
      version: "1.0.0",
      description: "API cho ứng dụng mạng xã hội (User, Post, Comment, Friend, Auth)",
    },
    servers: [
      {
        url: "http://localhost:5001",
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
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/modules/**/*.route.js"], // nơi chứa mô tả API (sẽ viết ở bước 3)
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
