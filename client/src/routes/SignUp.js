import React from "react";
import { Link } from "react-router-dom";
import { signup } from "../service/ApiService";
import logo from "../img/logo.png";
import style from "./Home.module.css";
import style2 from "./Login.module.css";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // 오브젝트에서 form에 저장된 데이터를 맵의 형태로 바꿔줌.
    const data = new FormData(event.target);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    signup({ email: email, username: username, password: password }).then(
      (response) => {
        // 계정 생성 성공 시 login페이지로 리디렉트
        window.location.href = "/login";
      }
    );
  }

  render() {
    return (
      <div component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
        <div>
          <Link to ={"/"}><img src={logo} className = {style.logo}></img></Link>
        </div>
        
        <form noValidate onSubmit={this.handleSubmit}>
          <div container spacing={2} className={style2.signupForm}>
            <div item xs={12} className={style2.loginHeader}>
              <h3>
              SING UP
              </h3>
            </div>
            <div item xs={12} className={style2.userName}>
              <input
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                placeholder="Name"
                autoFocus
              />
            </div>
            <div item xs={12} className={style2.userEmail}>
              <input
                variant="outlined"
                required
                fullWidth
                id="email"
                placeholder="Email"
                name="email"
                autoComplete="email"
              />
            </div>
            <div item xs={12} className={style2.userPassword}>
              <input
                variant="outlined"
                required
                fullWidth
                name="password"
                placeholder="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </div>
            <div item xs={12} className={style2.userSubmit}>
              <button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                SING UP
              </button>
            </div>
          </div>
          <div container justify="flex-end" className={style2.userExist}>
            <div item>
              <Link to ={`/Login`}>
              Already have an account? Please log in.
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;