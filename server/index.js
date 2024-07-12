import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path, { dirname } from "path"

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

if(process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '../client/dist')))
  
  
  app.get('*', (req, res)=> {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'))
  });
}

app.use(notFound); // Handle undefined routes after all defined routes
app.use(errorHandler); // Handle errors

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
