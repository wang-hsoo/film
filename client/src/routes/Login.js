import { Link } from "react-router-dom";
import React from "react";
import { signin } from "../service/ApiService";


class Login extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(event) {
      event.preventDefault();
      const data = new FormData(event.target);
      const email = data.get("email");
      const password = data.get("password");
      // ApiService의 signin 메서드를 사용 해 로그인.
      signin({ email: email, password: password });
    }
  
    render() {
      return ( 
        <div component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <div container spacing={2}>
              <Link to={'/'}>Film</Link>
              <Link to={'/SignUp'}>회원가입</Link>
            </div>
          <div container spacing={2}>
            <div item xs={12}>
              <h3>
                로그인
              </h3>
            </div>
          </div>
          <form noValidate onSubmit={this.handleSubmit}>
            {" "}
            {/* submit 버튼을 누르면 handleSubmit이 실행됨. */}
            <div container spacing={2}>
              <div item xs={12}>
                <input
                  variant="outlined"
                  required
                  type="text"
                  id="email"
                  placeholder="이메일 주소"
                  name="email"
                  autoComplete="email"
                />
              </div>
              <div item xs={12}>
                <input
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  placeholder="패스워드"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </div>
              <div item xs={12}>
                <button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  로그인
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }

export default Login;