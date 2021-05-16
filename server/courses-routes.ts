import {Request, Response} from 'express';
import {COURSES, QUESTIONS, AUTHORS, USERS, TUTORIALS} from './db-data';

export let coursesKeyCounter = 100;

export function getAllCourses(req: Request, res: Response) {
  console.log('Retrieving courses data ...');
  setTimeout(() => {
    res.status(200).json(Object.values(COURSES));
  }, 1000);
}

export function createCourse(req: Request, res: Response) {
  console.log('Creating new course ...');

  const changes = req.body;

  const error = validateCourse(req.body);

  if (error) {
    res.status(400).send(error);
  } else {
    const newCourse = {
      id: coursesKeyCounter,
      createdAt: Date.now(),
      slug: createSlug(req.body.title),
      ...changes,
    };

    COURSES[newCourse.id] = newCourse;

    // @ts-ignore
    coursesKeyCounter += 1;

    setTimeout(() => {
      res.status(200).json(newCourse);
    }, 2000);
  }
}

export function saveCourse(req: Request, res: Response) {
  console.log('Saving course ...');

  const id = req.params['id'],
    changes = req.body;

  COURSES[id] = {
    ...COURSES[id],
    ...changes,
  };

  setTimeout(() => {
    res.status(200).json(COURSES[id]);
  }, 2000);
}

export function getAuthors(req: Request, res: Response) {
  console.log('Retrieving authors data ...');

  setTimeout(() => {
    res.status(200).json(AUTHORS);
  }, 1000);
}

export function deleteCourse(req: Request, res: Response) {
  console.log('Deleting course ...');

  const id = req.params['id'];

  const tutorial = COURSES[id];

  delete COURSES[id];

  setTimeout(() => {
    res.status(200).json({id});
  }, 2000);
}

function createSlug(value) {
  return value
    .replace(/[^a-z0-9_]+/gi, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function validateCourse(course) {
  if (!course.title) {
    return 'Title is required.';
  }
  if (!course.authorId) {
    return 'Author is required.';
  }
  if (!course.category) {
    return 'Category is required.';
  }

  return '';
}
