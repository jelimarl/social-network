// eslint-disable-next-line no-unused-vars
export const loginUser = jest.fn((email, password) => Promise.resolve());
// eslint-disable-next-line no-unused-vars
export const createUser = jest.fn((email, password) => Promise.resolve());

export const googleSignIn = jest.fn(() => Promise.resolve());

export const getCurrentUser = jest.fn(() => Promise.resolve());

export const onGetPost = jest.fn(() => Promise.resolve());

export const getPost = jest.fn(() => Promise.resolve());

export const currentUser = {
  displayName: 'Milo',
  email: 'milo@gmail.com',
  uid: '12ab34cd56ef78gh',
  photoURL: 'https://imagizer.imageshack.com/img923/9210/UFd2QW.png',
};
