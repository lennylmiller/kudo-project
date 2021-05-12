import { Request, Response } from 'express';
import { USERS } from './db-data';

export function getAllUsers(req: Request, res: Response) {
  console.log('Retrieving users data ...');

  setTimeout(() => {
    res.status(200).json({ payload: Object.values(USERS) });
  }, 1000);
}

export function getUserByUrl(req: Request, res: Response) {
  const userUrl = req.params['userUrl'];

  const users: any = Object.values(USERS);

  const user = users.find((user) => user.url === userUrl);

  setTimeout(() => {
    res.status(200).json(user);
  }, 1000);
}
