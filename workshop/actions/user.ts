export const SET_USER_LOGGED_IN: string = 'SET_USER_LOGGED_IN';
export const setUserLoggedIn = (isLoggedIn: boolean = true) => ({
  type: SET_USER_LOGGED_IN,
  payload: isLoggedIn
});

export const SET_USERNAME: string = 'SET_USERNAME';
export const setUsername = (username: User['username']) => ({
  type: SET_USERNAME,
  payload: username
});
