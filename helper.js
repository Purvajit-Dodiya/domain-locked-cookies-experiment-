import jwt from "jsonwebtoken";

export function isAuthenticated(req, res, next) {
  try {
    let accesstoken = req.cookies.accessToken;
    console.log("middleware", accesstoken);
    if (!accesstoken) {
      return res.status(404).json({
        success: false,
        msg: "Token not found",
      });
    }
    const decoded = jwt.verify(accesstoken, process.env.ACCESS_TOKEN_KEY);
    console.log("middleware", accesstoken);
    req.email = decoded.email;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, msg: "auth failed", err: error });
    // console.error(error);
  }
}

export function verifyRefresh(email, token) {
  console.log("here");
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
    console.log("decoded:", decoded);
    return decoded.email === email;
  } catch (error) {
    console.error(error);
    return false;
  }
}
