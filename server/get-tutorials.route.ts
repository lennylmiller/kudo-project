import { Request, Response } from 'express';
import { TUTORIALS } from './db-data';

export function getAllTutorials(req: Request, res: Response) {
  console.log('Retrieving tutorials data ...');

  setTimeout(() => {
    res.status(200).json(Object.values(TUTORIALS));
  }, 1000);
}

export function getPublished(req: Request, res: Response) {
  const tutorials: any = Object.values(TUTORIALS);

  const tutorial = tutorials.find((tutorial) => tutorial.published);

  setTimeout(() => {
    res.status(200).json(tutorial);
  }, 1000);
}

export function getTutorial(req: Request, res: Response) {
  const tutorials: any = Object.values(TUTORIALS);

  const tutorial = tutorials.find((tutorial) => !tutorial.published);

  setTimeout(() => {
    res.status(200).json(tutorial);
  }, 1000);
}

export function getTutorialByUrl(req: Request, res: Response) {
  const tutorialUrl = req.params['tutorialUrl'];

  const tutorials: any = Object.values(TUTORIALS);

  const tutorial = tutorials.find((tutorial) => tutorial.url === tutorialUrl);

  setTimeout(() => {
    res.status(200).json(tutorial);
  }, 1000);
}
