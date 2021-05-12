import { Request, Response } from 'express';
import { TUTORIALS } from './db-data';

export function deleteTutorial(req: Request, res: Response) {
  console.log('Deleting tutorial ...');

  const id = req.params['id'];

  const tutorial = TUTORIALS[id];

  delete TUTORIALS[id];

  setTimeout(() => {
    res.status(200).json({ id });
  }, 2000);
}
