import update from 'immutability-helper';

export const getRandomInt = (min, max) => (
  // int min(inclusive), int max(exclusive)
  Math.floor(Math.random() * (max - min)) + min

  // int min(inclusive), int max(inclusive)
  // Math.floor(Math.random() * (max - min + 1)) + min
)