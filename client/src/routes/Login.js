import { Link } from "react-router-dom";
import React from "react";
import { signin } from "../service/ApiService";
import logo from "../img/logo.png";
import style from "./Home.module.css";
import style2 from "./Login.module.css";


class Login extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(event) {
      event.preventDefault();
      const data = new FormData(event.target);
      const email = data.get("email");
      localStorage.setItem("id", email);
      const password = data.get("password");
      // ApiService의 signin 메서드를 사용 해 로그인.
      signin({ email: email, password: password });
   
      
    }
    
  
    render() {

      
      return ( 
        <div component="main" maxWidth="xs"className = {style2.HHeader}>
          <div container spacing={2} >
              <Link to ={"/"}><img src={logo} className = {style.logo}></img></Link>
          </div>

          <div container spacing={2} className={style2.loginHeader}>
            <h3>LOGIN</h3>
          </div>

          <form noValidate onSubmit={this.handleSubmit}>
            {" "}
            {/* submit 버튼을 누르면 handleSubmit이 실행됨. */}
            <div container spacing={2} className={style2.loginForm}>
              <div item xs={12} className={style2.emailInput}>
                <input
                  variant="outlined"
                  required
                  type="text"
                  id="email"
                  placeholder="Email"
                  name="email"
                  autoComplete="off"
                />
              </div>
              <div item xs={12} className={style2.passwordInput}>
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
              <div item xs={12} className={style2.loginBtn}>
                <button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  SIGN IN
                </button>
                
              </div>
              <Link to={'/SignUp'}><div item xs={12} className={style2.signUpBtn}>SIGN UP</div></Link>
            </div>
          </form>
        </div>
      );
    }
  }

export default Login;