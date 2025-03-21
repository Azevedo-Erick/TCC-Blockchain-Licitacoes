import vine from "@vinejs/vine";

/**
 * Converte um esquema Vine para o formato OpenAPI (Swagger)
 */
export function vineToSwagger(schema: any) {
    const properties: any = {};
    const rules = schema.tree; // Obtém as regras do Vine

    for (const [key, rule] of Object.entries(rules)) {
        if (rule instanceof vine.string) {
            properties[key] = { type: "string", description: `Campo do tipo string` };
        } else if (rule instanceof vine.date) {
            properties[key] = { type: "string", format: "date", description: `Campo do tipo data` };
        }
        // Adicionar outros tipos conforme necessário
    }

    return { type: "object", properties };
}
