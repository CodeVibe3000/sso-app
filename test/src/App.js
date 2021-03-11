import React, { useState } from "react"
import { createVerification } from "sso-app-sdk"
import "./App.css"
import { Main } from "./components/Main"

function App() {
  const [email, setEmail] = useState("")

  const submitCreateVerification = () => {
    createVerification(email, "My Fake App").then((key) => {
      localStorage.setItem("ssoKey", key)
      window.location.reload()
    })
  }

  return (
    <div className='app'>
      {localStorage.getItem("ssoKey") ? (
        <Main />
      ) : (
        <div className='appLogin'>
          <h2>Login With Fake SSO</h2>
          <input
            placeholder='Email'
            className='appLogin__input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <br></br>
          <button
            className='appLogin__button'
            onClick={submitCreateVerification}
          >
            Login
          </button>
        </div>
      )}
    </div>
  )
}

export default App
