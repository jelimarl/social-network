export const loginUser = jest.fn(() => Promise.resolve());

export const createUser = jest.fn(() => Promise.resolve());

export const googleSignIn = jest.fn(() => Promise.resolve());

export const getCurrentUser = jest.fn(() => Promise.resolve());

export const onGetPost = jest.fn((callback) => {
  callback([{
    id: '123erf',
    data: () => ({
      name: 'Nunito', uid: '12ab34cd56ef78gh', email: 'nunito@gmail.com', photo: 'urlphoto', contentPost: 'Hola', counterLikes: 0, date: 1243563, usersLikes: [],
    }),
  }]);
});

export const getPost = jest.fn(() => Promise.resolve({
  id: '123erf',
  data: () => ({
    name: 'Nunito', uid: '12ab34cd56ef78gh', email: 'nunito@gmail.com', photo: 'urlphoto', contentPost: 'Hola', counterLikes: 0, date: 1243563, usersLikes: [],
  }),
}));

export const saveDisplayName = jest.fn(() => Promise.resolve());

export const savePost = jest.fn(() => Promise.resolve());

export const editPost = jest.fn(() => Promise.resolve({
  id: '123erf',
  data: () => ({
    name: 'Nunito', uid: '12ab34cd56ef78gh', email: 'nunito@gmail.com', photo: 'urlphoto', contentPost: 'Hola', counterLikes: 0, date: 1243563, usersLikes: [],
  }),
}));

export const deletePost = jest.fn(() => Promise.resolve());

export const likePost = jest.fn(() => Promise.resolve({
  id: '123erf',
  data: () => ({
    name: 'Nunito', uid: '12ab34cd56ef78gh', email: 'nunito@gmail.com', photo: 'urlphoto', contentPost: 'Hola', counterLikes: 0, date: 1243563, usersLikes: [],
  }),
}));

export const logOut = jest.fn(() => Promise.resolve());

export const currentUser = {
  displayName: 'Milo',
  email: 'milo@gmail.com',
  uid: '12ab34cd56ef78gh',
  photoURL: 'https://imagizer.imageshack.com/img923/9210/UFd2QW.png',
};
