import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import taskRoutes from './src/routes/taskRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import { errorHandlerMiddleware } from './src/middleware/errorHandler.js';

const app = express();

app.use(express.json());
app.use('/api', taskRoutes);
app.use('/api', userRoutes);
app.use(errorHandlerMiddleware);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Arash',
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Failed to connect to MongoDB', error.message);
  });
