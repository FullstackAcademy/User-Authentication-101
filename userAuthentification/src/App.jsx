import { useState } from "react";
import Authenticate from "./components/Authenticate.jsx";
import SignUpForm from "./components/SignUpForm.jsx";
import { TokenContext } from "./TokenContext";
import "./App.css";

export default function App() {
  const [token, setToken] = useState(null);
  return (
    <>
      <TokenContext.Provider value={{ token, setToken }}>
        <SignUpForm token={token} setToken={setToken} />

        <Authenticate token={token} setToken={setToken} />
      </TokenContext.Provider>
    </>
  );
}
