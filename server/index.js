import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path, { dirname } from "path"
import cors from 'cors'


import userRoutes from './routes/userRoutes.js';
import blogRoutes from "./routes/blogRotues.js"
import connectToMongoDB from './config/DB.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectToMongoDB(); // Connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 5000;

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

app.use('/api/users', userRoutes); // Define routes here
app.use('/api/blog', blogRoutes); // Define routes here

if(process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/dist')))
  
  
  app.get('/', (req, res)=> {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
  });
}

app.use(notFound); // Handle undefined routes after all defined routes
app.use(errorHandler); // Handle errors

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

