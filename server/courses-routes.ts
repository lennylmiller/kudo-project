import {Request, Response} from 'express';
import {COURSES} from './db-data';

export let coursesKeyCounter = 100;

export function createCourse(req: Request, res: Response) {
  console.log('Creating new course ...');

  const changes = req.body;

  const error = validateCourse(req.body);

  if (error) {
    req.status(400).send(error);
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

// Centralized logic

// Returns a URL friendly slug
function createSlug(value) {
  return value
    .replace(/[^a-z0-9_]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function validateCourse(course) {
  if (!course.title) return "Title is required.";
  if (!course.authorId) return "Author is required.";
  if (!course.category) return "Category is required.";
  return "";
}
