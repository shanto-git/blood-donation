import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [error, setError] = useState();
  const { signIn } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        navigate(`${location.state?.from?.pathname || "/"}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        // alert(errorCode, errorMessage);
        setError(errorCode);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content w-96">
        <div className="card bg-base-100 w-full max-w-2xl shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <h1 className="text-2xl text-center font-bold">Login With Email</h1>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input"
                placeholder="Email"
                required
              />
              <label className="label">Password</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Password"
                required
              />
              <span
                className="absolute right-7 top-1/2 translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />
}
              </span>
              <div>
                <Link to="forgotPass" className="link link-hover">
                  Forgot password?
                </Link>
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button type="submit" className="btn btn-neutral mt-4">
                Login
              </button>
              <p className="text-center">
                Don't have an account? Please{" "}
                <Link
                  to="/auth/register"
                  className="text-blue-500 hover:underline"
                >
                  SignUp
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
