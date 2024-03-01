import jwt from "jsonwebtoken";

export function isAuthenticated(req, res, next) {
  try {
    let accesstoken = req.cookies.accessToken;
    if (!accesstoken) {
      return res.status(404).json({
        success: false,
        msg: "Token not found",
      });
    }
    const decoded = jwt.verify(accesstoken, process.env.ACCESS_TOKEN_KEY);
    console.log("middleware decoded", decoded, req.headers);
    // Assuming the email is included in the JWT token
    if (req.headers["x-email"] == decoded.email) {
      console.log("same", decoded.exp);
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, msg: "auth failed", err: "Email mismatch" });
    }
  } catch (error) {
    console.log("error ", error);
    return res
      .status(401)
      .json({ success: false, msg: "auth failed", err: error.message });
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
