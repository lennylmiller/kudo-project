import { Request, Response } from 'express';
import { QUESTIONS } from './db-data';

export function getAllQuestions(req: Request, res: Response) {
  console.log('Retrieving questions data ...');

  setTimeout(() => {
    res.status(200).json({ payload: Object.values(QUESTIONS) });
  }, 1000);
}

export function getAuthors(req: Request, res: Response) {
  console.log('Retrieving authors data ...');
  const authors = new Set(QUESTIONS.map(question => question.author));

  setTimeout(() => {
    res.status(200).json({ payload: Array.from(authors) });
  }, 1000);
}

export function getQuestion(req: Request, res: Response) {
  const id = req.params['id'];

  const questions: any = Object.values(QUESTIONS);

  const question = questions.find((question) => question.id === id);

  setTimeout(() => {
    res.status(200).json(question);
  }, 1000);
}

export function getQuestionByUrl(req: Request, res: Response) {
  const questionUrl = req.params['questionUrl'];

  const questions: any = Object.values(QUESTIONS);

  const question = questions.find((question) => question.url === questionUrl);

  setTimeout(() => {
    res.status(200).json(question);
  }, 1000);
}
