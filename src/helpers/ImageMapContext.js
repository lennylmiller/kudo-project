import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const imageMapsSeed = {
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
  'my-way-your-way' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/myway-yourway.jpeg',
  'teeter-or-totter' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/teeter-or-totter.jpeg',
  'tundra-or-tropic' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/tundra-or-tropic.jpeg',
  'up-or-down' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/up-or-down.jpeg',
  'what-do-you-think' : 'https://kudo-assignment.s3-us-west-2.amazonaws.com/what-do-you-think.jpeg',
};

export const ImageMapContext = createContext();

export const ImageMapProvider = ({ children }) => {
  const [imageMaps, setImageMaps] = useState(imageMapsSeed);

  const randomImage = () => {
    return [
      'apple-or-orange',
      'his-or-hers',
      'my-way-your-way',
      'teeter-or-totter',
      'tundra-or-tropic',
      'up-or-down',
      'what-do-you-think'
    ][Math.floor((Math.random() * 7) + 1)];
  };

  const getAvatarURL = (author) => {
    return `https://kudo-assignment.s3-us-west-2.amazonaws.com/${ author }.jpg`;
  };

  const getQuestionId = () => {
    const questionId = uuidv4();
    let image = randomImage();

    while (image === null || image === undefined) {
      image = randomImage();
    }

    const changes = { ...imageMaps };

    changes[questionId] = `https://kudo-assignment.s3-us-west-2.amazonaws.com/${ image }.jpeg`;
    setImageMaps(changes);

    return questionId;
  };

  const getQuestionImage = (questionId) => {
    return imageMaps[questionId];
  };

  return (
    <ImageMapContext.Provider
      value={ {
        imageMaps,
        setImageMaps,
        getQuestionId,
        getQuestionImage,
        getAvatarURL
      } }
    >
      { children }
    </ImageMapContext.Provider>
  );
};


