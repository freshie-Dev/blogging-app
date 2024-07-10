import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import connectToMongoDB from './config/DB.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectToMongoDB(); // Connect to MongoDB

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 5000;

app.use('/api/users', userRoutes); // Define routes here

app.use(notFound); // Handle undefined routes after all defined routes
app.use(errorHandler); // Handle errors

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
