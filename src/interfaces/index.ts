export interface Message {
  id: string;
  text: string;
  type: 'message' | 'notification';
  timestamp: string;
  head?: string;
  username?: string;
  userId?: string;
}

export interface IUser {
  _id?: string;
  email: string;
  username: string;
  password?: string;
}

export interface IUserMethods {
  generateHash: (password: string) => string;
  validatePassword: (password: string) => boolean;
}

export interface ServerToClientEvents {
  chat: (msg: Message) => void;
  disconnect: () => void;
}

export interface ClientToServerEvents {
  chat: (msg: { text: string }) => void;
  disconnect: () => void;
}
