import { ApiException } from '@/common/exceptions/api.exception';
export declare class NotFoundApiException extends ApiException {
    constructor(code: string, message: string, details?: unknown);
}
