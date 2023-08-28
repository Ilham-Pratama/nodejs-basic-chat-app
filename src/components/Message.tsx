import React from 'react';
import { IUser, Message as MessageType } from '../interfaces';

interface IMessage {
  message: MessageType;
  user: IUser;
}

function Message({ message, user }: IMessage) {
  const isMe = user?._id === message?.userId;
  return (
    <div className="flex flex-col my-3">
      <div
        className={`flex ${
          isMe ? 'justify-end' : 'justify-start'
        }`}
      >
        <div
          className={`max-w-6xl p-2 bg-slate-200`}
          // style={{ minWidth: '10em' }}
        >
          {!isMe && (
            <p
              className={`text-sm text-gray-600 ${
                isMe ? 'text-right' : 'text-left'
              }`}
            >
              {message.username}
            </p>
          )}
          {message.text}
        </div>
      </div>
    </div>
  );
}

export default Message;
