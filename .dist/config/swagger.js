"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
exports.options = {
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
};
//# sourceMappingURL=swagger.js.map