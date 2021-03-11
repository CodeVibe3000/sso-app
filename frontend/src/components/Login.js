import React, { useState } from "react"
import "../css/Login.css"

import { useMutation } from "@apollo/client"
import { loginMutation, registerMutation } from "../graphql/login"

export const Login = () => {
  const [login, setLogin] = useState(true)

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [registerUser] = useMutation(registerMutation)
  const [loginUser] = useMutation(loginMutation)

  const submit = () => {
    let params
    if (login) {
      params = { email, password }
      loginUser({ variables: params })
        .then((res) => {
          localStorage.setItem("token", res.data.login.accessToken)
          localStorage.setItem("user", JSON.stringify(res.data.login.user))
        })
        .catch(() => alert("Login Failed"))
    } else {
      params = { username, email, password }
      registerUser({ variables: params })
        .then(() => {
          loginUser({ variables: params })
            .then((res) => {
              localStorage.setItem("token", res.data.login.accessToken)
              localStorage.setItem("user", JSON.stringify(res.data.login.user))
            })
            .catch(() => alert("Login Failed"))
        })
        .catch(() => alert("Register Failed"))
    }
  }

  return (
    <div className='loginContainer'>
      <div className='login'>
        <h1>{login ? "Login" : "Register"}</h1>
        <br></br>
        {login ? null : (
          <input
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        )}
        <input
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          placeholder='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br></br>
        <button onClick={submit} className='submit'>
          {login ? "Login" : "Register"}
        </button>
        <br></br>
        <div className='login__chooseMethod'>
          <p onClick={() => setLogin(!login)}>
            {login ? "Create An Account Instead" : "Login Instead"}
          </p>
        </div>
      </div>
    </div>
  )
}
