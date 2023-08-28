import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import TextField from '../components/TextField';
import Button from '../components/Button';

const SignIn = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const signIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) return;

    fetch('/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.status !== 200) {
          alert('Invalid Crendetials');
        } else {
          window.location.href = '/';
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      className="mt-10 m-auto "
      style={{ width: '45em' }}
    >
      <div className="text-3xl font-semibold mb-4 text-center">
        Welcome
      </div>
      <form onSubmit={signIn}>
        <div className="flex mb-3">
          <div className="flex-1">
            <TextField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className='w-3' />
          <div className="flex-1">
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
        </div>
        <div className="flex justify-between items-center ">
          <Button type="submit">Submit</Button>
          <p>
            Don&apos;t have an account?{' '}
            <span className="text-blue-600 underline">
              <a href="/sign-up">Sign up</a>
            </span>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

const element = document.getElementById('main');
const root = createRoot(element);

root.render(<SignIn />);
