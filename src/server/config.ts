import { SessionOptions } from 'express-session';

const env = process.env;

export const SESSION_OPTIONS: SessionOptions = {
  secret: '-my-local-testing',
  cookie: {
    maxAge: 60000 * 60 * 24,
  },
  resave: false,
  saveUninitialized: false,
};

export const PORT = env.PORT ? parseInt(env.PORT) : 8080;
export const HOST = env.HOST ?? '0.0.0.0';
export const SERVER_URL = `http://${HOST}:${PORT}`;

export const MONGODB_URI =
  env.MONGODB_URI ?? 'mongodb://localhost:27017';
export const DATABASE_NAME = env.DATABASE_NAME ?? 'local';

export default {
  PORT,
  HOST,
  SERVER_URL,
  SESSION_OPTIONS,
};
