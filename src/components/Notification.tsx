import React from 'react';
import { Message } from '../interfaces';

function Notification(props: Message) {
  return (
    <div className="text-gray-600 text-center my-3">
      {new Date(props.timestamp).toLocaleTimeString()} - {props.text}
    </div>
  );
}

export default Notification;
