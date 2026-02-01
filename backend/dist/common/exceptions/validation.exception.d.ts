import { ApiException } from '@/common/exceptions/api.exception';
export declare class ValidationApiException extends ApiException {
    constructor(details: unknown);
}
