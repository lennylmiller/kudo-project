import { format } from 'd3-format';
import { v4 as uuidv4 } from 'uuid';

export const getAvatarURL = (author) => {
  return `https://kudo-assignment.s3-us-west-2.amazonaws.com/${ author }.jpg`;
};

export const imageMaps = {
  '8xf0y6ziyjabvozdd253nd' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/memory-loss.jpg',
  '6ni6ok3ym7mf1p33lnez' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/super-hero-or-super-villain.jpg',
  'am8ehyc8byjqgar0jgpub9' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/telekinetic-or-telepathic.jpg',
  'loxhs1bqm25b708cmbf3g' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/backend-or-front-end-developer.jpg',
  'vthrdm985a262al8qx3do' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/fifty-for-you-five-hundred-for-a-friend.jpg',
  'xj352vofupe1dqz9emx13r' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/javaScript-or-swift.jpg',
  'newUserOne' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/survey-clipart.jpg',
  'questionNew' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/index.jpg',
  'poll' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/poll.jpeg',
  'apple-or-orange' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/apple-or-orange.jpeg',
  'his-or-hers' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/his-or-hers.jpeg',
  'myway-yourway' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/myway-yourway.jpeg',
  'teeter-or-totter' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/teeter-or-totter.jpeg',
  'tundra-or-tropic' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/tundra-or-tropic.jpeg',
  'up-or-down' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/up-or-down.jpeg',
  'what-do-you-think' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/what-do-you-think.jpeg',
};

const randomImage = () => {
 return [
    'apple-or-orange',
    'his-or-hers',
    'myway-yourway',
    'teeter-or-totter',
    'tundra-or-tropic',
    'up-or-down',
    'what-do-you-think'
  ][Math.floor((Math.random() * 7) + 1)]
}

export const getQuestionId = () => {
  const questionId = uuidv4()
  let image = randomImage();

  while (image === null || image === undefined) {
    image = randomImage();
  }

  imageMaps[questionId] = `https://kudo-assignment.s3-us-west-2.amazonaws.com/${image}.jpeg`

  return questionId
};

export const clearCurrentUserVote = (votes, currentUser) => {
  const clonedArray = votes.slice();
  return clonedArray.splice(currentUser.id, 1);
};

export const getVotesWithoutCurrentUser = (question, currentUser) => {
  return {
    optionOne : {
      votes : clearCurrentUserVote(question.optionOne.votes, currentUser),
      text : question.optionOne.text.slice()
    },
    optionTwo : {
      votes : clearCurrentUserVote(question.optionTwo.votes, currentUser),
      text : question.optionTwo.text.slice()
    }
  };
};

export const getText = (question, currentUser) => {
  return {
    optionOne : {
      votes : clearCurrentUserVote(question.optionOne.votes, currentUser),
      text : question.optionOne.text.slice()
    },
    optionTwo : {
      votes : clearCurrentUserVote(question.optionTwo.votes, currentUser),
      text : question.optionTwo.text.slice()
    }
  };
};

export const newQuestion = {
  id : null,
  author : '',
  optionOne : {
    text : '',
    votes : []
  },
  optionTwo : {
    text : '',
    votes : []
  },
  timestamp : 0,

};

export const signedCurrency = format('+$,.2f'); // +$1,000.00 -$1,000.00

export const signedShortCurrency = format('+$,.0f'); // +$1,000.00 -$1,000.00
export const currency = format('$,.2f');  // $1,000.00

export const getAnswerCount = (user) => {
  return Object.keys(user.answers).length;
};

