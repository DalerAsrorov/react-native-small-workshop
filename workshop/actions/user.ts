export const loginUser = () => (
  dispatch: (action: any) => any,
  getState: () => any
) => {
  console.log('login user action dispatched');
  // get username from store and make
  // a call to firestore to create new user
};

export const SET_USERNAME = 'SET_USERNAME';
export const setUsername = (username: string) => ({
  type: SET_USERNAME,
  payload: username
});
