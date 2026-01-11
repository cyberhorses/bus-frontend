import { Welcome } from "../welcome/welcome";

export function meta() {
  return [
    { title: "BUS bleble" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function WelcomePg() {
  return <Welcome />;
}
