/* eslint-disable import/no-unresolved */
import { showSection } from '../src/router.js';

jest.mock('../src/lib/firebaseServices.js');

describe('Router', () => {
  it('Check LogIn is called', () => {
    // eslint-disable-next-line quotes
    document.body.innerHTML = `<div id="root"></div>`;
    window.location.hash = '#login';
    showSection();
    expect(document.querySelector('h2.register__title').textContent).toBe('Log in');
  });

  it('Check Register is called', () => {
    // eslint-disable-next-line quotes
    document.body.innerHTML = `<div id="root"></div>`; 
    window.location.hash = '#register';
    showSection();
    expect(document.querySelector('h2.register__title').textContent).toBe('Create account');
  });
});
