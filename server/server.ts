import * as express from 'express';
import {Application} from 'express';

import {getAllQuestions, getQuestionByUrl, getQuestion } from './get-questions.route';
import {loginUser, singinUser} from './auth.route';
import {saveQuestion} from './save-question.route';
import {createQuestion} from './create-question.route';
import {deleteQuestion} from './delete-question.route';

import {getAllUsers, getUserByUrl} from './get-users.routes';
import {saveUser} from './save-user.route';
import {createUser, signupUser} from './create-user.route';
import {testAll, testUser, testMod, testAdmin} from './TestInfo';

import {createTutorial} from './create-tutorial.route';
import {getAllTutorials, getPublished, getTutorial} from './get-tutorials.route';
import {saveTutorial} from './save-tutorial.route';
import {deleteTutorial} from './delete-tutorial.route';

import  {getAuthors, coursesKeyCounter, createCourse, saveCourse, getAllCourses, deleteCourse } from './courses-routes';

import * as bodyParser from 'body-parser';

const app: Application = express();

app.use(bodyParser.json());

app.route('/api/auth/signup').post(signupUser);
app.route('/api/auth/signin').post(singinUser);

app.route('/api/login').post(loginUser);
app.route('/api/users').get(getAllUsers);
app.route('/api/users').post(createUser);
app.route('/api/users/:id').put(saveUser);
app.route('/api/users/:userUrl').get(getUserByUrl);

app.route('/api/questions').get(getAllQuestions);
app.route('/api/questions/:id').get(getQuestion);
app.route('/api/questions/:questionUrl').get(getQuestionByUrl);
app.route('/api/questions/add').post(createQuestion);
app.route('/api/questions/:id').put(saveQuestion);
app.route('/api/questions/:id').delete(deleteQuestion);
// Backward compatibility
app.route('/api/question').post(createQuestion);
app.route('/api/question/:id').put(saveQuestion);
app.route('/api/question/:id').delete(deleteQuestion);

app.route('/api/test/all').get(testAll);
app.route('/api/test/user').get(testUser);
app.route('/api/test/mod').get(testMod);
app.route('/api/test/admin').get(testAdmin);

app.route('/api/tutorials/').get(getAllTutorials);
app.route('/api/tutorials/').post(createTutorial);
app.route('/api/tutorials/:id').get(getTutorial);
app.route('/api/tutorials/:id').put(saveTutorial);
app.route('/api/tutorials/:id').delete(deleteTutorial);
app.route('/api/tutorials/published').get(getPublished);

// getAuthors, createCourse, saveCourse
app.route('/api/courses').get(getAllCourses);
app.route('/api/authors').get(getAuthors);
app.route('/api/courses').post(createCourse);
app.route('/api/courses/:id').put(saveCourse);
app.route('/api/courses/:id').delete(deleteCourse);


const httpServer: any = app.listen(9000, () => {
  console.log(
    'HTTP REST API Server running at http://localhost:' +
    httpServer.address().port
  );
});
