import { Request, Response } from 'express';
import { USERS } from './db-data';

export function saveUser(req: Request, res: Response) {
  console.log('Saving user ...');

  const id = req.params['id'],
    changes = req.body;

  USERS[id] = {
    ...USERS[id],
    ...changes,
  };

  setTimeout(() => {
    res.status(200).json(USERS[id]);
  }, 2000);
}
