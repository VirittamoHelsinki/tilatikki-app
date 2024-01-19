// types.d.ts
import { Response as ExpressResponse } from 'express';

export interface AdvancedResults<T> {
    success: boolean;
    count: number;
    data: T[];
}

export interface CustomResponse<T> extends ExpressResponse {
    advancedResults?: AdvancedResults<T>;
}