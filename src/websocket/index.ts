import { Express } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import {
  ClientToServerEvents,
  Message,
  ServerToClientEvents,
} from '../interfaces';

const initiateWebsocket = (app: Express) => {
  const server = http.createServer(app);
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents
  >(server, {
    cors: {
      origin: 'http://localhost:8080',
    },
  });

  // only allow authenticated users
  io.use((socket, next) => {
    if (
      socket.handshake.query?._id &&
      socket.handshake.query?.username &&
      socket.handshake.query?.email
    )
      next();
    else next(new Error('Unauthorized'));
  });

  io.on('connection', (socket) => {
    io.emit('chat', {
      text: `${socket.handshake.query.username} joined chat`,
      timestamp: new Date().toISOString(),
      id: `${socket.handshake.query._id}-${Math.random()}`,
      type: 'notification',
    });

    console.info(`${socket.handshake.query.username} connected`);

    socket.on('chat', ({ text }) => {
      if (!socket.handshake.query?._id) {
        io.emit('disconnect');
        return;
      }
      const message: Message = {
        id: `${socket.handshake.query._id}-${Math.random()}`,
        userId: socket.handshake.query._id as string,
        username: socket.handshake.query.username as string,
        text,
        timestamp: new Date().toISOString(),
        type: 'message',
      };
      io.emit('chat', message);
    });
    socket.on('disconnect', () => {
      io.emit('chat', {
        text: `${socket.handshake.query.username} left chat`,
        timestamp: new Date().toISOString(),
        id: `${socket.handshake.query._id}-${Math.random()}`,
        type: 'notification',
      });
      console.info(
        `${socket.handshake.query.username} disconnected`,
      );
    });
  });

  server.listen(8090, () => {
    console.info('listening on *:8090');
  });
};

export { initiateWebsocket };
