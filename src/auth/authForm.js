import { useState, useRef, useContext } from "react";
import classes from "./authForm.module.css";
import { AuthContext } from "../store/auth-context";
import { useNavigate } from "react-router";

const AuthForm = () => {
  const AuthtCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogedin, setIsLogedIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const switchAutModelHandler = () => {
    setIsLogedIn((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let url;

    setLoading(true);
    if (isLogedin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCH6JVo6eJhjbFVpOn6mgquZn5Kthql-Cg";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCH6JVo6eJhjbFVpOn6mgquZn5Kthql-Cg";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed";
            if (data && data.error.message) errorMessage = data.error.message;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        AuthtCtx.login(data.idToken);
        navigate("/profile");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <section>
      <form className={classes.form} onSubmit={submitHandler}>
        <h1 className={classes.head}>{isLogedin ? "Login" : "Sign Up"}</h1>
        <div className={classes.control}>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.togle}>
          {!loading && (
            <button className={classes.submit}>
              {isLogedin ? "Login" : "Create Account"}
            </button>
          )}
          {loading && (
            <p className={classes.loader} style={{ textAlign: "center" }}>
              Sending...{" "}
            </p>
          )}
          <button type="button" onClick={switchAutModelHandler}>
            {isLogedin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
