import { useState } from "react";
import useAuth from "../Login/useAuth.ts";
import LoginWrapper from "../Login/login.ts";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import ButtonGrpWrapper from "../../components/Button/buttonGrpWrapper.ts";
import InputWrapper from "../../components/Input/input.ts";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const { signUp, authLoading } = useAuth();
  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setPassword(e.target.value);
    if (confirmPassword !== e.target.value) {
      setIsPasswordMatch(false);
    } else {
      setIsPasswordMatch(true);
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setIsPasswordMatch(false);
    } else {
      setIsPasswordMatch(true);
    }
  };

  function handleSubmit() {
    if (username === "") setErrorMsg("Please enter a username.");
    else if (password === "") setErrorMsg("Please enter a password.");
    else if (!isPasswordMatch) setErrorMsg("Passwords not matching");
    else {
      signUp({ username, password });
    }
  }

  return authLoading ? (
    <Loader />
  ) : (
    <LoginWrapper>
      <h2>Sign Up</h2>
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
            onChange={handlePasswordChange}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Re-enter Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </InputWrapper>
        {errorMsg !== "" && <p className="error">{errorMsg}</p>}
        <ButtonGrpWrapper>
          <div className="common-flex">
            {" "}
            Already registered ?{" "}
            <Button
              className="login-btn"
              type={"button"}
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign In
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

export default SignUp;