import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { user } from "./db.js";
import jwt from "jsonwebtoken";
import { isAuthenticated, verifyRefresh } from "./helper.js";

const app = express();
config();
app.use(cookieParser());
app.use(express.json());
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listining at ${port}`);
});

app.get("/", (req, res) => {
  res
    // .cookie("test", "testing") //if same site not specified  it will be treated as lax by default
    // Cookies with SameSite=Strict are only sent in a first-party context.
    .cookie("test", "testing", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    })
    // //Cookies with SameSite=Lax are sent with top-level navigation GET requests initiated by third-party websites.
    // //They are not sent with requests initiated by third-party websites via methods like POST.

    // .cookie("test", "testing", {
    //   httpOnly: true,
    //   sameSite: "lax",
    //   secure: true,
    // })
    // // Cookies with SameSite=None are sent along with both first-party and third-party requests.
    // .cookie("test", "testing", {
    //   httpOnly: true,
    //   sameSite: "none",
    //   secure: true,
    // })
    .send("hello world");
});
app.get("/test", (req, res) => {
  //access cookies from req
  console.log(req.cookies.test);
  res.send(`Hello World ${req.cookies.test}`);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email + "\n" + password);
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Enter valid credientials" });
  }
  const findUser = user.find(
    (use) => use.email === email && use.password === password
  );
  console.log("findUser", findUser);
  if (!findUser) {
    return res
      .status(400)
      .json({ success: false, error: "Incorrect credientials" });
  }
  const accessToken = jwt.sign(
    { email: email },
    process.env.ACCESS_TOKEN_KEY || "test",
    {
      expiresIn: "2m",
    }
  );
  const refreshToken = jwt.sign(
    { email: email },
    process.env.REFRESH_TOKEN_KEY || "test",
    {
      expiresIn: "10m",
    }
  );
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
  return res.status(200).json({ Logedin: true });
});

app.get("/protected", isAuthenticated, (req, res) => {
  res.json({ success: true, msg: "Welcome user!!", email: req.email });
});

app.post("/refresh", (req, res) => {
  const { email } = req.body;
  const refreshToken = req.cookies.refreshToken;
  console.log("incoming refresh token:", refreshToken);
  console.log("incoming email:", email);
  const isValid = verifyRefresh(email, refreshToken);
  if (!isValid) {
    return res
      .status(401)
      .json({ success: false, error: "Invalid token,try login again" });
  }
  const accessToken = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "2m",
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
  return res.status(200).json({ success: true, accessToken });
});
