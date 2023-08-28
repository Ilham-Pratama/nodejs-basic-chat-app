import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Socket, io } from 'socket.io-client';
import {
  IUser,
  Message,
  ServerToClientEvents,
  ClientToServerEvents,
} from '../interfaces';
import TextField from '../components/TextField';
import Button from '../components/Button';
import Notification from '../components/Notification';
import MessageComponent from '../components/Message';

const App = () => {
  let socketRef =
    useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();

  const [text, setText] = useState('');
  const [user, setUser] = useState<IUser>();
  const [messages, setMessages] = useState<Message[]>([]);

  const onMessageSubmit = () => {
    if (text) {
      socketRef.current?.emit('chat', {
        text,
      });
      setText('');
    }
  };

  const signOut = () => (window.location.href = '/sign-out');

  useEffect(() => {
    fetch('/auth/current-user')
      .then((res) => res.json())
      .then((res) => {
        if (!res._id) throw new Error('No ID detected!');
        else {
          setUser(res);

          socketRef.current = io('http://localhost:8090', {
            query: {
              username: res.username,
              email: res.email,
              _id: res._id,
            },
          });

          socketRef.current.on('chat', (msg: Message) =>
            setMessages((msgs) => [...msgs, msg]),
          );
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mt-8 m-auto " style={{ width: '45em' }}>
      <div className="flex flex-col" style={{ height: '50vh' }}>
        <h3 className="text-center text-3xl mb-5 flex justify-center">
          Welcome,
          <span className="font-semibold ml-1">
            {user?.username}
          </span>
          ! <div className=" w-2" />
          <Button compact onClick={signOut}>
            Sign Out
          </Button>
        </h3>
        <div className="flex-1 overflow-auto p-3">
          {messages.map((msg) => {
            if (msg.type === 'message') {
              return (
                <MessageComponent
                  message={msg}
                  user={user}
                  key={msg.id}
                />
              );
            } else {
              return <Notification {...msg} key={msg.id} />;
            }
          })}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onMessageSubmit();
          }}
          className="flex mt-3"
        >
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type anything..."
          />
          <div className="w-2" />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

const element = document.getElementById('main');
const root = createRoot(element);

root.render(<App />);
