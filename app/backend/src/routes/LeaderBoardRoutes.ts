import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardController = new LeaderBoardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.getPerformanceTeamsHome(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderBoardController.getPerformanceTeamsAway(req, res),
);

router.get(
  '/',
  (req: Request, res: Response) => leaderBoardController.getClassificationOfTheTeams(req, res),
);

export default router;
