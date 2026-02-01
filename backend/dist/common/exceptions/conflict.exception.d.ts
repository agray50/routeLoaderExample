import { ApiException } from '@/common/exceptions/api.exception';
export declare class ConflictApiException extends ApiException {
    constructor(code: string, message: string, details?: unknown);
}
