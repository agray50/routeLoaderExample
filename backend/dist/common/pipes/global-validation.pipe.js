"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalValidationPipe = void 0;
const common_1 = require("@nestjs/common");
function flattenValidationErrors(errors) {
    const result = [];
    for (const error of errors) {
        if (error.constraints) {
            result.push({
                field: error.property,
                errors: Object.values(error.constraints),
            });
        }
        if (error.children && error.children.length > 0) {
            const childErrors = flattenValidationErrors(error.children);
            for (const childError of childErrors) {
                result.push({
                    field: `${error.property}.${childError.field}`,
                    errors: childError.errors,
                });
            }
        }
    }
    return result;
}
exports.globalValidationPipe = new common_1.ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
        enableImplicitConversion: true,
    },
    exceptionFactory: (errors) => {
        const details = flattenValidationErrors(errors);
        return new common_1.UnprocessableEntityException({
            code: 'VALIDATION_ERROR',
            message: 'Invalid request data',
            details,
        });
    },
});
//# sourceMappingURL=global-validation.pipe.js.map