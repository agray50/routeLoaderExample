"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationApiException = void 0;
const common_1 = require("@nestjs/common");
const api_exception_1 = require("./api.exception");
class ValidationApiException extends api_exception_1.ApiException {
    constructor(details) {
        super(common_1.HttpStatus.UNPROCESSABLE_ENTITY, {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request data',
            details,
        });
    }
}
exports.ValidationApiException = ValidationApiException;
//# sourceMappingURL=validation.exception.js.map