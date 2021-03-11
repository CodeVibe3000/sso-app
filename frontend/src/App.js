import React from "react"
import { Login } from "./components/Login"
import { MainApp } from "./components/MainApp"

function App() {
  return (
    <div className='App'>
      {!localStorage.getItem("user") ? (
        <Login />
      ) : (
        <MainApp user={JSON.parse(localStorage.getItem("user"))} />
      )}
    </div>
  )
}

export default App
