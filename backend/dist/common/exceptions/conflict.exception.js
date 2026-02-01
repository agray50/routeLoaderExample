"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictApiException = void 0;
const common_1 = require("@nestjs/common");
const api_exception_1 = require("./api.exception");
class ConflictApiException extends api_exception_1.ApiException {
    constructor(code, message, details) {
        super(common_1.HttpStatus.CONFLICT, { code, message, details });
    }
}
exports.ConflictApiException = ConflictApiException;
//# sourceMappingURL=conflict.exception.js.map