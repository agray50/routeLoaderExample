import { HttpException, HttpStatus } from '@nestjs/common';
export interface ApiError {
    code: string;
    message: string;
    details?: unknown;
}
export declare class ApiException extends HttpException {
    constructor(status: HttpStatus, error: ApiError);
}
