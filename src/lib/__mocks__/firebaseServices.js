// eslint-disable-next-line no-unused-vars
export const loginUser = jest.fn((email, password) => Promise.resolve());
// eslint-disable-next-line no-unused-vars
export const createUser = jest.fn((email, password) => Promise.resolve());

export const googleSignIn = jest.fn(() => Promise.resolve());

export const getCurrentUser = jest.fn(() => Promise.resolve());

export const onGetPost = jest.fn(() => Promise.resolve());
