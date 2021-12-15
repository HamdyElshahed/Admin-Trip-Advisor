import "../style/style.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { isLoggedInContext } from "../context/isloggedin";
import { app, db } from "../config/firebase";
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
function Login(props) {
  const auth = getAuth(app);
  const history = useHistory();
  const { isloggedin, setisloggedin } = useContext(isLoggedInContext);
  const [loginauth, setloginvalue] = useState({
    email: "",
    password: "",
    emailvalid: true,
    emailtext: "",
    passwordvalid: true,
    passwordtext: "",
    disable: false,
  });

  function handle(e) {
    const regemail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regpassword =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    switch (e.target.name) {
      case "email":
        setloginvalue({
          ...loginauth,
          email: e.target.value,
          emailvalid: regemail.test(e.target.value) ? true : false,
          emailtext: loginauth.emailvalid ? "" : "email input require",
          disable: !(loginauth.emailvalid && loginauth.passwordvalid),
        });
        break;
      case "password":
        setloginvalue({
          ...loginauth,
          password: e.target.value,
          passwordvalid: regpassword.test(e.target.value) ? true : false,
          passwordtext: loginauth.passwordvalid
            ? ""
            : "password must contain at least one lowercase character , uppercase characte , numeric value ,(?=.*[-+_!@#$%^&*., ?]) represents at least one special character. ",
          disable: !(loginauth.emailvalid && loginauth.passwordvalid),
        });
        console.log(
          `email :  ${loginauth.email} password : ${loginauth.password}`
        );
        break;
      default:
        break;
    }
    console.log(`email :  ${loginauth.email} password : ${loginauth.password}`);
  }

  function submitlogin(e) {
    e.preventDefault();
    console.log(loginauth.email);
    console.log(loginauth.password);
    console.log(auth);
    signInWithEmailAndPassword(auth, loginauth.email, loginauth.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user.uid);
        const docSnap = await getDoc(doc(db, "Users", user.uid));
        let userDoc = docSnap.data();
        console.log(userDoc);
        if (userDoc.isAdmin) {
          setisloggedin(true);
          history.push("/dashboard");
        } else {
          signOut(auth)
            .then(() => {
              console.log("signout");
            })
            .catch((error) => {
              alert(error.message);
            });
        }
      })
      .catch((error) => {
        alert(error.message);
      });
    console.log(loginauth);
  }
  return (
    <main className="py-5 backgroundimg">
      <section className="container" style={{ paddingBottom: "1.6rem" }}>
        <div className="row pb-5" style={{ paddingTop: "3rem" }}>
          <div className="col-md-6 col-12 m-auto py-4 registerbox">
            <div className="row">
              <div className="col-12 px-3">
                <form
                  className="col-8 m-auto py-3"
                  onSubmit={(e) => submitlogin(e)}
                >
                  <h2 className="pb-4">Login</h2>
                  <div className="row py-3 mb-4 ">
                    <button
                      className="btn btn-danger btn-lg px-3 py-1 mx-3 col-11 rounded"
                      href="#"
                    >
                      <i className="fab fa-google px-2"></i> Google
                    </button>
                  </div>
                  <div className=" mb-4">
                    <div className="form-group position-relative py-2">
                      <label for="email" className="registerformlabel">
                        <i className="fas fa-envelope"></i>
                      </label>
                      <input
                        type="email"
                        className={`registerforminput ${
                          loginauth.emailvalid ? "" : "border-danger"
                        }`}
                        id="Email"
                        name="email"
                        onChange={(e) => handle(e)}
                        placeholder="Your Email"
                      ></input>
                    </div>
                      <small className="text-danger">
                        {loginauth.emailtext}
                      </small>
                  </div>
                  <div className=" mb-4">
                    <div className="form-group position-relative py-2">
                      <label for="password" className="registerformlabel">
                        <i className="fas fa-unlock-alt"></i>
                      </label>
                      <input
                        type="password"
                        className={`registerforminput ${
                          loginauth.passwordvalid ? "" : "border-danger"
                        }`}
                        id="inputPassword"
                        name="password"
                        placeholder="Password"
                        onChange={(e) => handle(e)}
                      ></input>
                    </div>
                      <small className="text-danger">
                        {loginauth.passwordtext}
                      </small>
                  </div>
                  <div className="py-2">
                    <button
                      className="btn btn-dark btn-lg px-3 py-1 w-100 my-1 rounded-3"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
