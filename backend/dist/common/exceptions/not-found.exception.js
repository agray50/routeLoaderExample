"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundApiException = void 0;
const common_1 = require("@nestjs/common");
const api_exception_1 = require("./api.exception");
class NotFoundApiException extends api_exception_1.ApiException {
    constructor(code, message, details) {
        super(common_1.HttpStatus.NOT_FOUND, { code, message, details });
    }
}
exports.NotFoundApiException = NotFoundApiException;
//# sourceMappingURL=not-found.exception.js.map