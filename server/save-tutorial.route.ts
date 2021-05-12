import { Request, Response } from 'express';
import { TUTORIALS } from './db-data';

export function saveTutorial(req: Request, res: Response) {
  console.log('Saving tutorial ...');

  const id = req.params['id'],
    changes = req.body;

  TUTORIALS[id] = {
    ...TUTORIALS[id],
    ...changes,
  };

  setTimeout(() => {
    res.status(200).json(TUTORIALS[id]);
  }, 2000);
}
