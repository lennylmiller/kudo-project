import { Request, Response } from 'express';
import { TUTORIALS } from './db-data';

export let tutorialsKeyCounter = 100;

export function createTutorial(req: Request, res: Response) {
  console.log('Creating new tutorial ...');

  const changes = req.body;

  const newTutorial = {
    id: tutorialsKeyCounter,
    seqNo: tutorialsKeyCounter,
    ...changes,
  };

  TUTORIALS[newTutorial.id] = newTutorial;

  tutorialsKeyCounter += 1;

  setTimeout(() => {
    res.status(200).json(newTutorial);
  }, 2000);
}
