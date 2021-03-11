import React, { useState, useEffect } from "react"
import { fetchUserFromVerification } from "sso-app-sdk"

export const Main = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUserFromVerification(
      parseInt(localStorage.getItem("ssoKey"))
    ).then((resUser) => setUser(resUser))
  })

  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div>
      {user ? (
        <div>
          <p>
            Username: <strong>{user.username}</strong>
          </p>
          <p>
            Email: <strong>{user.email}</strong>
          </p>
          <br></br>
          <br></br>
          <button className='main__logout' onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h2>Please verify this login in the SSO App</h2>
        </div>
      )}
    </div>
  )
}
