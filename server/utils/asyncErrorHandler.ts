import { type Request, type Response, type NextFunction } from 'express';

// This function takes an asynchronous function (fn) as its argument.
function asyncHandler<PromiseReturn>(fn: (req: Request, res: Response, next: NextFunction) => Promise<PromiseReturn>) {
  // It returns a new function that takes the request (req), response (res), and next middleware function (next).
  return (req: Request, res: Response, next: NextFunction) =>
    // Inside this function, we wrap the execution of the provided async function (fn) with a Promise.
    // We use Promise.resolve() to ensure that any value returned from the async function is treated as a promise.
    Promise.resolve(fn(req, res, next))
      // If the async function (fn) rejects with an error, we catch the error and pass it to the next middleware function.
      .catch(next);
}

// Export the asyncHandler function.
export default asyncHandler;
