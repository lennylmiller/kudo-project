import { Request, Response } from 'express';
import { QUESTIONS } from './db-data';

export let questionsKeyCounter = 100;

export function createQuestion(req: Request, res: Response) {
  console.log('Creating new question ...');

  const changes = req.body;

  const newQuestion = {
    id: questionsKeyCounter,
    seqNo: questionsKeyCounter,
    ...changes,
  };

  QUESTIONS[newQuestion.id] = newQuestion;

  questionsKeyCounter += 1;

  setTimeout(() => {
    res.status(200).json(newQuestion);
  }, 2000);
}
