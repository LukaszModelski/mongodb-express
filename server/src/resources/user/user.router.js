import { Router } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./user.model";
import { logError } from "../../utils/logger";

import { validateEmail } from "../../utils/validateEmail";
import {
  getAuthTokens,
  hashRefreshToken,
  clearRefreshTokenFromUser,
} from "../../utils/tokens";

const router = Router();

router.route("/signup").post(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).send({ message: "email or password missing in request." }).end();
  }
  if (!validateEmail(email)) {
    return res.status(400).send({ message: "Wrong email format" }).end();
  }
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(409)
        .send({ message: "User with that email alredy exist." })
        .end();
    }
    const hasedPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({ email, password: hasedPassword });

    // Lets requestLogger attach the userId to this request's log entry.
    res.locals.userId = String(newUser._id);

    // The new user is logged in right away, so they get the same tokens as after /login.
    const tokens = await getAuthTokens(newUser);
    return res
      .status(201)
      .send({
        newUser: {
          _id: newUser._id,
          email: newUser.email,
        },
        token: tokens.token,
        refreshToken: tokens.refreshToken,
        message: "New user created succesfully.",
      })
      .end();
  } catch (err) {
    logError(err, "user.signup");
    return res.status(500).send({ message: "Could not create account." }).end();
  }
});

router.route("/login").post(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).send({ message: "email or password missing in request." }).end();
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).send({ message: "Authentication failed." }).end();
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send({ message: "Authentication failed." }).end();
    }

    // Lets requestLogger attach the userId to this request's log entry.
    res.locals.userId = String(user._id);

    const tokens = await getAuthTokens(user);
    return res
      .status(200)
      .send({
        user: {
          _id: user._id,
          email: user.email,
        },
        token: tokens.token,
        refreshToken: tokens.refreshToken,
        message: "Login succesfull.",
      })
      .end();
  } catch (err) {
    logError(err, "user.login");
  }
});

router.route("/refresh").post(async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(400).send({ message: "refreshToken missing in request." }).end();
  }

  try {
    const user = await User.findOne({
      refreshTokenHash: hashRefreshToken(refreshToken),
    });

    if (
      !user ||
      !user.refreshTokenExpiresAt ||
      user.refreshTokenExpiresAt.getTime() <= Date.now()
    ) {
      if (user) {
        await clearRefreshTokenFromUser(user);
      }
      return res.status(401).send({ message: "Invalid or expired refresh token." }).end();
    }

    const tokens = await getAuthTokens(user);
    return res
      .status(200)
      .send({
        user: {
          _id: user._id,
          email: user.email,
        },
        token: tokens.token,
        refreshToken: tokens.refreshToken,
        message: "Token refreshed.",
      })
      .end();
  } catch (err) {
    logError(err, "user.refresh");
    return res.status(500).send({ message: "Could not refresh token." }).end();
  }
});

router.route("/revoke").post(async (req, res) => {
  const refreshToken = req.body.refreshToken;
  const encodedJWT = req.query.jwt;

  try {
    if (refreshToken) {
      const user = await User.findOne({
        refreshTokenHash: hashRefreshToken(refreshToken),
      });
      if (user) {
        await clearRefreshTokenFromUser(user);
      }
      return res.status(200).send({ message: "Refresh token revoked." }).end();
    }

    if (encodedJWT) {
      const decoded = jwt.verify(encodedJWT, process.env.JWT_SECRET);
      const user = await User.findById(decoded.user._id);
      if (user) {
        await clearRefreshTokenFromUser(user);
      }
      return res.status(200).send({ message: "Refresh token revoked." }).end();
    }

    return res
      .status(400)
      .send({ message: "refreshToken or jwt missing in request." })
      .end();
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res.status(401).send({ message: "Wrong or outdated JWT" }).end();
    }
    logError(err, "user.revoke");
    return res.status(500).send({ message: "Could not revoke refresh token." }).end();
  }
});

export default router;
