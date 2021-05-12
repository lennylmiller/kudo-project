import { Request, Response } from 'express';
import { USERS } from './db-data';

export let usersKeyCounter = 100;

export function createUser(req: Request, res: Response) {
  console.log('Creating new user ...');

  const changes = req.body;

  const newUser = {
    id: usersKeyCounter,
    seqNo: usersKeyCounter,
    ...changes,
  };

  USERS[newUser.id] = newUser;

  usersKeyCounter += 1;

  setTimeout(() => {
    res.status(200).json(newUser);
  }, 2000);
}

export function signupUser(req: Request, res: Response) {
  console.log('Creating new user ...');

  const changes = req.body;

  const newUser = {
    id: usersKeyCounter,
    seqNo: usersKeyCounter,
    ...changes,
  };

  USERS[newUser.id] = newUser;

  usersKeyCounter += 1;

  setTimeout(() => {
    res.status(200).json({ message:"User was registered successfully!" });
  }, 2000);
}
