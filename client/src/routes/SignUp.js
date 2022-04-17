import React from "react";
import { Link } from "react-router-dom";
import { signup } from "../service/ApiService";

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
        <form noValidate onSubmit={this.handleSubmit}>
          <div container spacing={2}>
            <div item xs={12}>
              <h3>
                계정 생성
              </h3>
            </div>
            <div item xs={12}>
              <input
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                placeholder="유저 이름"
                autoFocus
              />
            </div>
            <div item xs={12}>
              <input
                variant="outlined"
                required
                fullWidth
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
                계정 생성
              </button>
            </div>
          </div>
          <div container justify="flex-end">
            <div item>
              <Link to ={`/Login`}>
                이미 계정이 있습니까? 로그인 하세요.
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;