import swaggerJSDoc from "swagger-jsdoc";


export const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        tags: [
            {
                name: "Products",
                description: "API of products"
            }
        ],
        info: {
            title: "REST API / Node / Express / TypeScript",
            version: "1.0.0",
            description: "API Docs"
        },

    },
    apis: ["./src/router.ts"]
}