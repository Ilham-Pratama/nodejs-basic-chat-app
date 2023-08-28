import express from 'express';
import session, { Session } from 'express-session';
import config, { SESSION_OPTIONS } from './config';
import { initiateWebsocket } from '../websocket';
import { initiateMongoose } from '../schema';
import { IUser } from '../interfaces';
import auth from './authentication';

declare module 'express-session' {
  interface SessionData {
    user: Partial<IUser>;
  }
}

declare module 'http' {
  interface IncomingMessage {
    session: Session & {
      user: Partial<IUser>;
    };
    sessionStore: any;
  }
}

const server = express();

if (server.get('env') === 'production') {
  server.set('trust proxy', 1); // trust first proxy
  SESSION_OPTIONS.cookie.secure = true; // serve secure cookies
}

const sessionMiddleware = session(SESSION_OPTIONS);

server.set('view engine', 'ejs');

server.use(express.json());
server.use(express.static('dist'));
server.use(sessionMiddleware);

initiateMongoose();
initiateWebsocket(server, sessionMiddleware);

server.use('/auth', auth);

server.get('/sign-in', (req, res) => {
  res.render('sign-in');
});

server.get('/sign-up', (req, res) => {
  res.render('sign-up');
});

server.get('/sign-out', async (req, res) => {
  req.session.user = {};
  res.redirect('/sign-in');
});

server.get('/', (req, res) => {
  if (!req.session.user?.email || !req.session.user?.username)
    return res.redirect('/sign-in');
  return res.render('index');
});

server.listen(config.PORT, config.HOST, () => {
  console.info(`Server is listening at ${config.SERVER_URL}`);
});
