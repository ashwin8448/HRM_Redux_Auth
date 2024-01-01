import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import LoginWrapper from "./login";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import { getCookie } from "../../utils/helper.ts";
import InputWrapper from "../../components/Input/input.ts";
import ButtonGrpWrapper from "../../components/Button/buttonGrpWrapper.ts";

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
    <div className="center-loader">
      <Loader />
    </div>
  ) : (
    <LoginWrapper>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputWrapper>
        {(errorMsg != "" && <p className="error">{errorMsg}</p>) ||
          (authError != "" && <p className="error">{authError}</p>)}

        <ButtonGrpWrapper>
          <div className="common-flex">
            Not Already registered ?
            <Button
              className="login-btn"
              type={"button"}
              onClick={() => {
                navigate("/sign-up");
              }}
            >
              Create new account
            </Button>
          </div>
          <Button type={"button"} onClick={handleSubmit}>
            Submit
          </Button>
        </ButtonGrpWrapper>
      </form>
    </LoginWrapper>
  );
}

export default Login;