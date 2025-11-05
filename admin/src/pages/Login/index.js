import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../context/AppContext";
import Logo from "../../assets/image/logo.jpg";
import patern from "../../assets/image/patern.jpeg";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/image/logo.jpg";

const Login = () => {
  const [inputIndex, setInputIndex] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { login, setIsHideSidebarAndHeader } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsHideSidebarAndHeader(true);

    document.title = "Login";

    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) favicon.href = logo;
  }, [setIsHideSidebarAndHeader]);

  const focusInput = (index) => setInputIndex(index);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const result = await login(email, password);
    if (result.success) {
      navigate("/"); // redirect after login
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <>
      <img src={patern} className="logoPatern" alt="Pattern" />
      <section className="loginSection">
        <div className="loginBox">
          <div className="logo text-center">
            <img src={Logo} width="60px" alt="Logo" />
            <h5 className="font-weight-bold">Login to </h5>
          </div>

          <div className="wrapper wrapperlogin mt-3 card1 border p-4">
            <form onSubmit={handleLogin}>
              <div
                className={`form-group mb-3 position-relative ${
                  inputIndex === 0 && "focus"
                }`}
              >
                <span className="icon">
                  <MdEmail />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => focusInput(0)}
                  onBlur={() => setInputIndex(null)}
                  required
                />
              </div>

              <div
                className={`form-group mb-3 position-relative ${
                  inputIndex === 1 && "focus"
                }`}
              >
                <span className="icon">
                  <RiLockPasswordFill />
                </span>
                <input
                  type={isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => focusInput(1)}
                  onBlur={() => setInputIndex(null)}
                  required
                />

                <span
                  className="toggleShowPassword"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? <IoMdEye /> : <IoMdEyeOff />}
                </span>
              </div>

              {errorMsg && (
                <p className="text-danger text-center">{errorMsg}</p>
              )}

              <div className="form-group">
                <Button type="submit" className="btn-blue btn-lg w-100 btn-big">
                  Sign In
                </Button>
              </div>

              <div className="form-group text-center mt-2">
                <Link to="/reset-password" className="link">
                  FORGOT PASSWORD
                </Link>

                <div className="d-flex align-items-center justify-content-center mt-3 mb-3 or">
                  <span className="line"></span>
                  <span className="txt">or</span>
                  <span className="line"></span>
                </div>

                <Button
                  variant="outlined"
                  className="w-100 btn-lg btn-big loginWithGoogle"
                >
                  <img
                    src="https://imagepng.org/wp-content/uploads/2019/08/google-icon-1.png"
                    className="googleicon"
                    alt="Google Icon"
                  />{" "}
                  sign in with google
                </Button>
              </div>
            </form>
          </div>

          {/* <div className="wrapper wrapperlogin mt-3 card1 border footer p-3">
            <span className="text-center">
              don't have an account ?
              <Link to="/signup" className="link color ms-2">
                Register
              </Link>
            </span>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default Login;
