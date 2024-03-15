/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response as ExpressResponse } from 'express';

declare module 'express-serve-static-core' {
  interface Response {
    advancedResults?: {
      success: boolean;
      count: number;
      pagination?: unknown;
      data: unknown[];
    };
  }
}
