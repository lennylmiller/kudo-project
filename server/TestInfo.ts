import { Request, Response } from 'express';

export function testAll(req: Request, res: Response) {
  console.log('Retrieving users data ...');

  setTimeout(() => {
    res.status(200).send("Public Content.");
  }, 500);
}

export function testUser(req: Request, res: Response) {
  console.log('Retrieving users data ...');

  setTimeout(() => {
    res.status(200).send("User Content.");
  }, 500);
}

export function testAdmin(req: Request, res: Response) {
  console.log('Retrieving users data ...');

  setTimeout(() => {
    res.status(200).send("Admin Content.");
  }, 1000);
}

export function testMod(req: Request, res: Response) {
  console.log('Retrieving users data ...');

  setTimeout(() => {
    res.status(200).send("Moderator Content.");
  }, 500);
}


