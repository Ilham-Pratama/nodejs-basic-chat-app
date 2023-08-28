import express from 'express';
import { User } from '../schema';

const router = express.Router();

router.post('/sign-up', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
  });

  newUser.password = newUser.generateHash(req.body.password);
  await newUser.save();

  res.sendStatus(200).end();
});

router.post('/sign-in', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.sendStatus(404).end();
  else if (!user.validatePassword(req.body.password))
    return res.sendStatus(401).end();

  if (!req.session.user) {
    req.session.user = {};
  }

  req.session.user.username = user.username;
  req.session.user.email = user.email;
  req.session.user._id = user._id;

  res.sendStatus(200).end();
});

router.get('/current-user', async (req, res) => {
  res.setHeader('Content-Type', 'application/json'); 
  res.json(req.session.user || {}).end();
});

export default router;
