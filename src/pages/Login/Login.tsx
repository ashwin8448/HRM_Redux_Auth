import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import LoginWrapper from "./login";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import { getCookie } from "../../utils/helper.ts";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { login, authError, authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie("accessToken")) navigate("/", { replace: true });
  }, []);

  function handleSubmit() {
    if (username === "") setErrorMsg("Please enter a username.");
    else if (password === "") setErrorMsg("Please enter a password.");
    else {
      login({
        username,
        password,
      });
    }
  }

  return authLoading ? (
    <Loader />
  ) : (
    <LoginWrapper>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {(errorMsg != "" && <p className="error">{errorMsg}</p>) ||
            (authError != "" && <p className="error">{authError}</p>)}
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <div className="buttons-container">
            <Button
              type={"button"}
              onClick={() => {
                navigate("/sign-up");
              }}
            >
              Create new account
            </Button>
            <Button type={"button"} onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </LoginWrapper>
  );
}

export default Login;
