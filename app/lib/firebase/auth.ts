import { onAuthStateChanged } from 'firebase/auth';
import { app, auth } from '.';

export const getUserSession = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
};