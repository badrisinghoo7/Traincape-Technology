import React, { useEffect, useState } from "react";
import loginpage from "../css/Login.module.css";
import { FaCircleUser } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loginUser } from "../slices/userSlice";

const Login = () => {
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Dispatch the login action and wait for it to complete
      const result = await dispatch(loginUser({ email: payload.email, password: payload.password }));
      console.log({loginResult:result});
      
      if (loginUser.fulfilled.match(result)) {
        // Login successful, navigate to the home page
        navigate('/');
      } else if(loginUser.rejected.match(result)) {
        // Login failed, handle the error
        console.error('Login failed:', result);
         }
    } catch (error) {
      console.error('An error occurred:', error);
      }
  };
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={loginpage.wrapper}>
      <div className={loginpage.formBoxLogin}>
        <form onSubmit={handleSubmit} className={loginpage.LoginForm}>
          <h1>Login</h1>
          {error && 
          <p style={{color:"red",fontSize:"1rem"}}>{error}</p>
          }
          <div className={loginpage.inputBox}>
            <input
              type="text"
              placeholder="email"
              name="email"
              required
              onChange={handleChange}
            />
            <FaCircleUser className={loginpage.icon} />
          </div>
          <div className={loginpage.inputBox}>
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              onChange={handleChange}
            />
            <FaRegEyeSlash className={loginpage.icon} />
          </div>
          <div className={loginpage.RememberPassword}>
            <div>
              <input type="checkbox" required />
              <span className={loginpage.spanbox}>Remember password</span>
            </div>
            <div className={loginpage.RememberPasswordText}>
              <a href="#">Forget Password</a>
            </div>
          </div>
          <button type="submit">Login</button>

          <div className={loginpage.registerLink}>
            <p>
              Don't have an account? <a href="/signup">Register here..</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
