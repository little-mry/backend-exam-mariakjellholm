import swaggerJSDoc from "swagger-jsdoc";
import { Options } from "swagger-jsdoc";

const swaggerDefinition: Options = {
  openapi: "3.0.0",
  info: {
    title: "Swingnotes API",
    version: "1.0.0",
    description: 'Individuell examination "Backend grunder"',
    contact: {
      name: "Maria Kjellholm",
    },
    licence: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Lokal utvecklingsserver",
    },
    {
      url: "http://localhost:3030",
      description: "Fallback-server om 3000 är upptagen",
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
    parameters: {
      AuthorizationHeader: {
        name: "Authorization",
        in: "header",
        description: "JWT-token, prefixa med `Bearer `",
        required: true,
        schema: {
          type: "string",
          example:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\
    .eyJpZCI6IjEyMyIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSJ9\
    .SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        },
      },
    },
    schemas: {
      UserSignUp: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string", example: "Användaren har skapats" },
          data: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "123e4567-e89b-12d3-a456-426614174000",
              },
              email: {
                type: "string",
                format: "email",
                example: "mail@example.com",
              },
              password: {
                type: "string",
              },
              createdAt: {
                type: "string",
                format: "date-time",
                example: "2025-04-15T07:32:05.903Z",
              },
            },
          },
        },
      },
      UserSignIn: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string", example: "Inloggningen lyckades" },
          data: {
            type: "object",
            properties: {
              user: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                    format: "email",
                    example: "mail@example.com",
                  },
                },
              },
            },
          },
          accessToken: {
            type: "string",
            example:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyM2UtNDU2Ny04OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTY4Mjk2ODAwMCwiZXhwIjoxNjgzMDU0NDAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
          },
          refreshToken: {
            type: "string",
            example:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyM2UtNDU2Ny04OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTY4Mjk2ODAwMCwiZXhwIjoxNjgzMDU0NDAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
          },
        },
      },
      Notes: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: "true",
          },
          message: {
            type: "string",
            example: "Hämtning av anteckningar lyckades",
          },
          data: {
            type: "array",
            items: {
              type: "object",
              properties: {
                _id: {
                  type: "string",
                  example: "1d02df3e-45dd-6f78-912b-3a45aa6b7f89",
                },
                userId: {
                  type: "string",
                  example: "1d02df3e-45dd-6f78-912b-3a45aa6b7f89",
                },
                title: {
                  type: "string",
                  example: "Anteckning 1",
                },
                text: {
                  type: "string",
                  example: "Lorem ipsum ....",
                },
                createdAt: {
                  type: "string",
                  example: "2025-04-28T12:42:10.155Z",
                },
                modifiedAt: {
                  type: "string",
                  example: "2025-04-28T12:42:10.155Z",
                },
              },
            },
          },
        },
      },
      Note: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: "true",
          },
          message: {
            type: "string",
            example: "Anteckning skapad",
          },
          data: {
            type: "object",
            properties: {
              _id: {
                type: "string",
                example: "1d02df3e-45dd-6f78-912b-3a45aa6b7f89",
              },
              userId: {
                type: "string",
                example: "1d02df3e-45dd-6f78-912b-3a45aa6b7f89",
              },
              title: {
                type: "string",
                example: "Anteckning 1",
              },
              text: {
                type: "string",
                example: "Lorem ipsum ....",
              },
              createdAt: {
                type: "string",
                example: "2025-04-28T12:42:10.155Z",
              },
              modifiedAt: {
                type: "string",
                example: "2025-04-28T12:42:10.155Z",
              },
            },
          },
        },
      },
    },
  },
  tags: [{ name: "User" }, { name: "Notes" }],
  paths: {
    "/api/user/signup": {
      post: {
        tags: ["User"],
        description: "Skapar en ny användare",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                    example: "test@example.com",
                  },
                  password: {
                    type: "string",
                    description: "Minst 6 tecken",
                  },
                },
              },
              required: ["email", "password"],
            },
          },
        },
        responses: {
          201: {
            description: "Användare skapad",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UserSignUp",
                },
              },
            },
          },
          400: {
            description: "Ogiltig indata",
          },
          500: {
            description: "Fel vid skapande av användare",
          },
        },
      },
    },
    "/api/user/signin": {
      post: {
        tags: ["User"],
        description: "Loggar in en användare",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                    example: "test@example.com",
                  },
                  password: {
                    type: "string",
                    description: "Minst 6 tecken",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Användare inloggad",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UserSignIn",
                },
              },
            },
          },
          400: {
            description: "Ogiltig indata",
          },
          500: {
            description: "Fel vid inloggning av användare",
          },
        },
      },
    },
    "/api/notes": {
      get: {
        security: [{ bearerAuth: [] }],
        tags: ["Notes"],
        description: "Returnerar lista med specifik användares anteckningar",
        parameters: [{ $ref: "#/components/parameters/AuthorizationHeader" }],
        responses: {
          200: {
            description: "Lyckad hämtning av anteckningar",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Notes",
                },
              },
            },
          },
          401: {
            description: "Åtkomst nekad, token saknas",
          },
          500: {
            description: "Fel vid hämtning av anteckningar",
          },
        },
      },
      post: {
        security: [{ bearerAuth: [] }],
        tags: ["Notes"],
        description: "Skapar en anteckning",
        parameters: [{ $ref: "#/components/parameters/AuthorizationHeader" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                  },
                  text: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Anteckning skapad",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Note",
                },
              },
            },
          },
          401: {
            description: "Åtkomst nekad, token saknas",
          },
          400: {
            description: "Ogiltig indata",
          },
          500: {
            description: "Fel vid skapande av anteckning",
          },
        },
      },
    },
    "/api/notes/{_id}": {
      patch: {
        security: [{ bearerAuth: [] }],
        tags: ["Notes"],
        description: "Uppdaterar en anteckning",
        parameters: [
          { $ref: "#/components/parameters/AuthorizationHeader" },
          {
            name: "_id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                  },
                  text: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Anteckning uppdaterad",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Note",
                },
              },
            },
          },
          401: {
            description: "Åtkomst nekad, token saknas",
          },
          404: {
            description:
              "Ingen anteckning hittades med det här id:t för den inloggade användaren.",
          },
          400: {
            description: "Ogiltig indata",
          },
          500: {
            description: "Fel vid uppdatering av anteckning",
          },
        },
      },
      delete: {
        security: [{ bearerAuth: [] }],
        tags: ["Notes"],
        description: "Raderar en anteckning utifrån ID",
        parameters: [
          { $ref: "#/components/parameters/AuthorizationHeader" },
          {
            name: "_id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          204: {
            description: "Anteckningen raderad ",
          },
          401: {
            description: "Åtkomst nekad, token saknas",
          },
          500: {
            description: "Fel vid borttagning av anteckning",
          },
        },
      },
    },
    "/api/notes/search": {
      get: {
        security: [{ bearerAuth: [] }],
        tags: ["Notes"],
        description: "Sök efter anteckningar baserat på en sökterm",
        parameters: [
          { $ref: "#/components/parameters/AuthorizationHeader" },
          {
            name: "q",
            in: "query",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Sökningen lyckades",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Notes",
                },
              },
            },
          },
          401: {
            description: "Åtkomst nekad, token saknas",
          },
          404: {
            description: "Inga anteckningar hittades",
          },
          400: {
            description: "Ogiltig indata",
          },
          500: {
            description: "Fel vid sökning",
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerDocs = swaggerJSDoc(swaggerDefinition);
