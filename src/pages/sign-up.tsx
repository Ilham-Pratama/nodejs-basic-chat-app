import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Button from '../components/Button';
import TextField from '../components/TextField';

const SignUp = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const signUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrMessage('');

    if (!email) return setErrMessage('Email is required!');
    if (!username) return setErrMessage('Username is required!');
    if (!password) return setErrMessage('Password is required!');
    if (!confirmPassword)
      return setErrMessage('Please confirm your password!');
    if (password !== confirmPassword)
      return setErrMessage("Passwords don't match!");

    fetch('/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    })
      .then((res) => {
        if (res.status !== 200) {
          alert('Invalid Crendetials');
        } else {
          window.location.href = '/sign-in';
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="mt-10 m-auto " style={{ width: '45em' }}>
        <div className="text-3xl font-semibold mb-4 text-center">
          Sign Up
        </div>
        <form onSubmit={signUp}>
          <div className="flex mb-3">
            <div className="flex-1">
              <TextField
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username *"
                required
              />
            </div>
            <div className="w-3" />
            <div className="flex-1">
              <TextField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="flex mb-3">
            <div className="flex-1">
              <TextField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password *"
                required
              />
            </div>
            <div className="w-3" />
            <div className="flex-1">
              <TextField
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm Password *"
                required
              />
            </div>
          </div>
          <div className="flex justify-between items-center ">
            <Button type="submit">Submit</Button>
            <p>
              Already have an account?{' '}
              <span className="text-blue-600 underline">
                <a href="/sign-in">Sign in</a>
              </span>
              .
            </p>
          </div>
        </form>
      </div>
      {/* <h2>Sign Up</h2>
      <form onSubmit={signUp}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username *"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email *"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password *"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password *"
        />
        {errMessage && (
          <p className="text-red-700">{errMessage}</p>
        )}
        <button type="submit">Submit</button>
      </form> */}
    </>
  );
};

const element = document.getElementById('main');
const root = createRoot(element);

root.render(<SignUp />);
