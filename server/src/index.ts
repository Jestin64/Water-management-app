import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import houseRoutes from './routes/houseRoutes';
import waterMeterRoutes from './routes/waterMeterRoutes';
import waterUsageRoutes from './routes/waterUsageRoutes';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/houses', houseRoutes);
app.use('/api/water-meters', waterMeterRoutes);
app.use('/api/water-usage', waterUsageRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 