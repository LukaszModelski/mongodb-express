import { Router } from 'express';
import bcryptjs from 'bcryptjs';
import { User } from './user.model';

import { validateEmail } from "../../utils/validateEmail";

const router = Router();

router
  .route('/')
  .post(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if(email && password) {
      if(!validateEmail(email)) {
        return res.status(409).send({message: 'Wrong email format'}).end();
      }
      const user = await User.findOne({email: email});
      if(user) {
        return res.status(409).send({message: 'User with that email alredy exist.'}).end();
      }
      try {
        const hasedPassword = await bcryptjs.hash(password, 10);
        const newUser = await User.create({email, password: hasedPassword});
        res.status(201).send({newUser, message: 'new user created'}).end();
      } catch (err) {
        console.log(err);
      }
    } else {
      res.status(400).send({message: 'email or password missing in request.'}).end();
    }
  });

export default router;
