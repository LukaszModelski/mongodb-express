import crypto from "crypto";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// Imports are evaluated before index.js calls dotenv.config(),
// so load env here to make the constants below read the real values.
dotenv.config();

const ACCESS_TOKEN_EXPIRES = process.env.JWT_ACCESS_EXPIRES || "1h";
const REFRESH_TOKEN_DAYS = Number(process.env.REFRESH_TOKEN_DAYS || 30);

export const hashRefreshToken = (refreshToken) =>
  crypto.createHash("sha256").update(refreshToken).digest("hex");

export const createRefreshToken = () => {
  const refreshToken = crypto.randomBytes(32).toString("hex");
  const refreshTokenHash = hashRefreshToken(refreshToken);
  const refreshTokenExpiresAt = new Date(
    Date.now() + REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000
  );

  return { refreshToken, refreshTokenHash, refreshTokenExpiresAt };
};

export const createAccessToken = (user) => {
  const unsignedToken = {
    user: {
      _id: user._id,
      email: user.email,
    },
  };

  return jwt.sign(unsignedToken, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES,
  });
};

export const saveRefreshTokenToUser = async (
  user,
  refreshTokenHash,
  refreshTokenExpiresAt
) => {
  user.refreshTokenHash = refreshTokenHash;
  user.refreshTokenExpiresAt = refreshTokenExpiresAt;
  await user.save();
};

export const clearRefreshTokenFromUser = async (user) => {
  user.refreshTokenHash = null;
  user.refreshTokenExpiresAt = null;
  await user.save();
};

export const getAuthTokens = async (user) => {
  const { refreshToken, refreshTokenHash, refreshTokenExpiresAt } =
    createRefreshToken();
  await saveRefreshTokenToUser(user, refreshTokenHash, refreshTokenExpiresAt);

  return {
    token: createAccessToken(user),
    refreshToken,
  };
};
