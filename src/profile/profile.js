import { useContext, useRef } from "react";
import classes from "./profile.module.css";
import { AuthContext } from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const newPasswordInputRef = useRef();
  const naigate = useNavigate();
  const { token } = useContext(AuthContext);

  naigate("");

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredPassword = newPasswordInputRef.current.value;
    console.log(enteredPassword);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCH6JVo6eJhjbFVpOn6mgquZn5Kthql-Cg",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: enteredPassword,
          returnSecureToken: false,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    // .then((res) => {
    //   if (res.ok) {
    //     return res.json();
    //   } else {
    //     throw new Error("request failed");
    //   }
    // })
    // .then((data) => {
    //   console.log(data);
    // });
  };

  return (
    <div className={classes.profile}>
      <h1>Profile</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="changePassword">
          <h2>change Password</h2>
        </label>
        <input id="changePassword" minLength={7} ref={newPasswordInputRef} />
        <div className={classes.action}>
          <button>Change password</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
