import { IUser } from "./schema";

export declare module 'express-session' {
  interface SessionData {
    user: Partial<IUser>;
  }
}
