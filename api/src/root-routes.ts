import express, { type Request, type Response } from 'express';
import { userRoutes } from './modules/user';

const router = express.Router();

router.use('/users', userRoutes);

router.use('/', (req: Request, res: Response) => {
  res.json({ message: 'Home' });
});

export default router;
