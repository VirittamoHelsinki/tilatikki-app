import express, { type Request, type Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import url from 'url';
import cookieParser from 'cookie-parser';
import { requestLogger, unknownEndpoint, errorHandler } from './utils/middleware.js';
import * as config from './utils/config.js';
import availabilityRoutes from './routes/availabilityRoutes.js';
import premiseRoutes from './routes/premiseRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import spaceRoutes from './routes/spaceRoutes.js';
import userRoutes from './routes/userRoutes.js';
import auth from './routes/authRoutes.js';
import logger from './utils/logger.js';
import { connectDb } from './utils/connectDB.js';


const app = express();

app.use(cookieParser());

// Cors is required during development to allow the frontend access to
// the backend. In production, the frontend and backend are served from
// the same domain so cors is not needed. Unless other website frontends
// on different domains need to use the API.
if (config.node_env === "development") app.use(cors());

// Middlewares that need to be applied before adding routes.
app.use(express.json());

app.use(
  express.static(
    path.join(
      url.fileURLToPath(new URL(".", import.meta.url)),
      "../client/dist/"
    )
  )
);

app.use(requestLogger);

// Add routes
// app.use();

// Middlewares that need to be applied after adding routes.
app.use("/api/auth", auth);
app.use("/api/availability", availabilityRoutes);
app.use("/api/premise", premiseRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/space", spaceRoutes);
app.use("/api/users", userRoutes);

app.use("/api/*", unknownEndpoint);
app.use(errorHandler);


// Paths that are not part of the API are handled by the frontend.
app.get("*", (_req: Request, res: Response) => {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  res.sendFile(path.join(__dirname + "../client/dist/index.html"));
});

// Close the database connection when the app is closed.
app.on("close", () => {
  mongoose.connection.close();
});

app.listen(config.port, async () => {
  logger.info(`users-server running on port: ${config.port}`);
  await connectDb();
});

export default app;
