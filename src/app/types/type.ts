export interface UserData {
  user: {
    id: string;
    email: string;
    username?: any;
    name?: any;
  };
  profile: {
    phone?: any;
    picture?: any;
    bio?: any;
  };
  tokens: {
    expiredAt: string;
    tokenType: string;
    accessToken: string;
    refreshToken: string;
    lastSignIn?: any;
  };
}
