import { Request, Response } from 'express';
import { authenticate, authenticateUsername } from './db-data';
import * as jwt from 'jsonwebtoken';
import * as config from './auth.config'

export function loginUser(req: Request, res: Response) {
  console.log('User login attempt ...');

  const { email, password } = req.body;

  const user = authenticate(email, password);

  if (user) {
    res.status(200).json({
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      avatarURL: user.avatarURL,
      answers: user.answers,
      questions: user.questions,
    });
  } else {
    res.sendStatus(403);
  }
}

export function singinUser(req: Request, res: Response) {
  console.log('User login attempt ...');

  const { username, password } = req.body;

  const user = authenticateUsername(username, password);

  const token = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 86400 // 24 hours
  });

  if (user) {
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      roles: ['ROLE_USER'],
      accessToken: token,
      // roles: ['ROLE_USER', 'ROLE_MODERATOR'],
      // roles: ['ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN'],
      name: user.name,
      avatarURL: user.avatarURL,
      answers: user.answers,
      questions: user.questions,
    });
  } else {
    res.sendStatus(403);
  }

}

