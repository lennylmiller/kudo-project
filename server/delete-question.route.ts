import { Request, Response } from 'express';
import { QUESTIONS } from './db-data';

export function deleteQuestion(req: Request, res: Response) {
  console.log('Deleting question ...');

  const id = req.params['id'];

  const question = QUESTIONS[id];

  delete QUESTIONS[id];

  setTimeout(() => {
    res.status(200).json({ id });
  }, 2000);
}
