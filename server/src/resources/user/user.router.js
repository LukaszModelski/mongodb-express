import { Router } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import { User } from './user.model';

import { validateEmail } from "../../utils/validateEmail";

const router = Router();

router
  .route('/signup')
  .post(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if(email && password) {
      if(!validateEmail(email)) {
        return res.status(409).send({message: 'Wrong email format'}).end();
      }
      try {
        const user = await User.findOne({email: email});
        if(user) {
          return res.status(409).send({message: 'User with that email alredy exist.'}).end();
        }
        const hasedPassword = await bcryptjs.hash(password, 10);
        const newUser = await User.create({email, password: hasedPassword});
        return res
          .status(201)
          .send({
            newUser: {
              _id: newUser._id,
              email: newUser.email
            },
            message: 'New user created succesfully.'
          })
          .end();
      } catch (err) {
        console.error(err);
      }
    } else {
      res.status(400).send({message: 'email or password missing in request.'}).end();
    }
  });

router
  .route('/login')
  .post(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if(email && password) {
      let passwordMatch = false;
      try {
        const user = await User.findOne({email: email});
        if(user) {
          passwordMatch = await bcryptjs.compare(password, user.password);
        }
        if(user && passwordMatch) {
          const unsignedToken = {
            user: {
              _id: user._id,
              email: user.email
            }
          }
          const signedToken = jwt.sign(unsignedToken, process.env.JWT_SECRET, { expiresIn: "1h" });
          return res
            .status(200)
            .send({
              user: {
                _id: user._id,
                email: user.email
              },
              token: signedToken,
              message: 'Login succesfull.'
            })
            .end();
        } else {
          res.status(401).send({message: 'Authentication failed.'}).end();
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      res.status(400).send({message: 'email or password missing in request.'}).end();
    }
  });

export default router;
