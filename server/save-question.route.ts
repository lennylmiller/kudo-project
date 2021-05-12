import { Request, Response } from 'express';
import { QUESTIONS } from './db-data';

export function saveQuestion(req: Request, res: Response) {
  console.log('Saving question ...');

  const id = req.params['id'],
    changes = req.body;

  QUESTIONS[id] = {
    ...QUESTIONS[id],
    ...changes,
  };

  setTimeout(() => {
    res.status(200).json(QUESTIONS[id]);
  }, 2000);
}
