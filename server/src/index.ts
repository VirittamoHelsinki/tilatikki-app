/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { type Request, type Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
// import path from "node:path";
// Import routes
import availabilityRoutes from "./routes/availabilityRoutes";
import premiseRoutes from "./routes/premiseRoutes";
import reservationRoutes from "./routes/reservationRoutes";
import spaceRoutes from "./routes/spaceRoutes";
import userRoutes from "./routes/userRoutes";
import buildingRoutes from "./routes/buildingRoutes";
import auth from "./routes/authRoutes";
import group from "./routes/groupRoutes";

// Import utils
import * as config from "./utils/config";
import logger from "./utils/logger";
import { connectDb } from "./utils/connectDB";
import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} from "./utils/middleware";

const app = express();

app.use(cookieParser());

// Cors is required during development to allow the frontend access to
// the backend. In production, the frontend and backend are served from
// the same domain so cors is not needed. Unless other website frontends
// on different domains need to use the API.
if (config.node_env === "development") app.use(cors());

// Middlewares that need to be applied before adding routes.
app.use(express.json());
// app.use(express.static(path.join(import.meta.dirname, "../client/dist/")));
// app.use(requestLogger);

connectDb()
const db = mongoose.connection;

// // Event handlers for MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Middlewares that need to be applied after adding routes.
app.use("/api/auth", auth);
app.use("/api/availability", availabilityRoutes);
app.use("/api/premise", premiseRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/space", spaceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/building", buildingRoutes);
app.use("/api/group", group);

// Default route for API status
app.use('/api', (_req, res) => {
  res.json({
    message: 'API is working',
    mongoDbConnection: db.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.use("/api/*", unknownEndpoint);
app.use(errorHandler);

// Close the database connection when the app is closed.
app.on("close", () => {
  console.log("Closing the app");
  db.close();
  // mongoose.connection.close();
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
