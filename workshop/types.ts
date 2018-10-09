interface User {
  isAuthenticated: boolean;
  username: string;
}

interface AppState {
  user: User;
}
