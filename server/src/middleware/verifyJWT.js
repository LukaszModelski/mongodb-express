import jwt from "jsonwebtoken";

/*
 * Decided to pass JWT in request param (not by cookies) because of native behaviour of Android and iOS.
 */
export const verifyJWT = (req, res, next) => {
  const encodedJWT = req.query.jwt;
  if (encodedJWT) {
    try {
      var decoded = jwt.verify(encodedJWT, process.env.JWT_SECRET);
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).send({ message: "Wrong or outdated JWT" }).end();
    }
  } else {
    res.status(401).send({ message: "No JWT in query param" }).end();
  }
};
