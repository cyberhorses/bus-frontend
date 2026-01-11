import { route } from "@react-router/dev/routes";


export default [
  route("", "routes/welcomePg.jsx"),
  route("login", "routes/login.jsx"),
  route("register", "routes/register.jsx"),
  route("userHome", "routes/userHome.jsx"),
  route("oops", "routes/errorPage.jsx")
];
