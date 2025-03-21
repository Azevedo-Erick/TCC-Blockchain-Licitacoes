import path from "path";
import { fileURLToPath } from "url";

export default {
    path: path.dirname(fileURLToPath(import.meta.url)) + "/../",

    title: "TCC - Licitações Blockchain",
    version: "1.0.0",
    description: "Trabalho de Conclusão de Curso - Sistemas de Informação - UNITINS",

    tagIndex: 2,
    productionEnv: "production",
    debug: false,
    snakeCase: true,
    persistAuthorization: true,
    showFullPath: true,

    ignore: ["/swagger", "/docs"],


    preferredPutPatch: "PUT",

    info: {
        title: "TCC - Licitações Blockchain",
        version: "1.0.0",
        description: "Trabalho de Conclusão de Curso - Sistemas de Informação - UNITINS",
    },

    securitySchemes: {},
    authMiddlewares: ["auth", "auth:api"],
    defaultSecurityScheme: "BearerAuth",

    common: {
        parameters: {},
        headers: {},
    },
};
