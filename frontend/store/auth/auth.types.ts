export interface User {
  _id: string;
  username: string;
  email: string;
  displayName: string;

  avatarUrl?: string;
  avatarId?: string;

  bio?: string;
  phone?: string;

  isOnline: boolean;
  lastSeen: string | null;

  friends: string[];
  friendRequests: string[];

  createdAt: string;
  updatedAt: string;
}

export interface SignupPayload {
   username: string;
  email: string;
  password: string;
  firstName: string;  
  lastName: string;
}

export interface SigninPayload {
  username: string;
  password: string;
}

export interface SignupResponse {
  username: string;
  email: string;
  password: string;
  firstName: string;  
  lastName: string; 
}

export interface SigninResponse {
  message: string;
  accessToken: string;
  user: User;
}
