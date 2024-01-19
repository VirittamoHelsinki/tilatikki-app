// Imports
import * as config from "./utils/config.js";
import fs from "fs";
import mongoose from "mongoose";
import logger from "./utils/logger.js";
import path from 'path';
import { fileURLToPath } from 'url';

// Models
import Availability from "./models/Availability.js";
import Premise from "./models/Premise.js";
import Reservation from "./models/Reservation.js";
import Space from "./models/Space.js";
import User from "./models/User.js";

// Function to connect to MongoDB and manage data import/destruction.
const connectDB = async () => {
  try {
    // Establish a connection to MongoDB using mongoose and environment variable.
    await mongoose.connect(config.mongoUri);
    logger.info('MongoDB connected');

    // Derive the directory name of the current module
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    // Read JSON data from filesystem and parse it.
    logger.info('Reading JSON data from filesystem...');
    const availabilitys = JSON.parse(fs.readFileSync(`${__dirname}/_data/availabilitys.json`, 'utf-8'));
    const premises = JSON.parse(fs.readFileSync(`${__dirname}/_data/premises.json`, 'utf-8'));
    const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));
    const spaces = JSON.parse(fs.readFileSync(`${__dirname}/_data/spaces.json`, 'utf-8'));
    const reservations = JSON.parse(fs.readFileSync(`${__dirname}/_data/reservations.json`, 'utf-8'));

    // Check command line arguments to determine whether to import or destroy data.
    if (process.argv[2] === '-import') {
      await importData(availabilitys, premises, users, spaces, reservations);
    } else if (process.argv[2] === '-destroy') {
      await destroyData();
    } else {
      logger.error('No valid flag provided. Use -import or -destroy.');
    }
  } catch (error) {
    logger.error('Error during database operation: ', error);
  } finally {
    exitProcess();
  }
};

// Function to import data into the database.
const importData = async (availabilitys:any, premises:any, users:any, spaces:any, reservations:any) => {
  logger.info('Importing data into database...');
  await Availability.create(availabilitys);
  logger.info('Availability Imported...');

  await Premise.create(premises);
  logger.info('Premise Imported...');

  await User.create(users);
  logger.info('User Imported...');

  await Space.create(spaces);
  logger.info('Space Imported...');

  await Reservation.create(reservations);
  logger.info('Reservation Imported...');

  logger.info('All data Imported...');
};

// Function to delete all data from the database.
const destroyData = async () => {
  logger.info('Destroying data in database...');
  await Availability.deleteMany();
  logger.info('Availability Data Destroyed...');

  await Premise.deleteMany();
  logger.info('Premise Data Destroyed...');

  await User.deleteMany();
  logger.info('User Data Destroyed...');

  await Space.deleteMany();
  logger.info('Space Data Destroyed...');

  await Reservation.deleteMany();
  logger.info('Reservation Data Destroyed...');

  logger.info('All data Destroyed...');
};

// Function to exit the process.
const exitProcess = () => {
  logger.info('Exiting process...');
  process.exit();
};

// Run the database connection function.
connectDB();