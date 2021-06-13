import jwt from "jsonwebtoken";

/*
* Decided to pass JWT in request param (not by cookies) because of native behaviour of Android and iOS.
*/
export const verifyJWT = (req, res, next) => {
  console.log(req);
  const encodedJWT = req.query.jwt;
  if (encodedJWT) {
    try {
      jwt.verify(encodedJWT, process.env.JWT_SECRET);
      next();
    } catch(err) {
      res.status(401).send({message: 'Wrong or outdated JWT'}).end();
    }
  } else {
    console.log('No JWT in query param');
    res.status(401).send({message: 'No JWT in query param'}).end();
  }
}
