import React from "react"
import "../css/MainApp.css"
import { useQuery, useMutation } from "@apollo/client"

import { fetchVerifications } from "../graphql/fetchVerifications"
import { verifyMutation } from "../graphql/verify"

export const MainApp = ({ user }) => {
  const { loading, error, data } = useQuery(fetchVerifications)
  const [verify] = useMutation(verifyMutation)

  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  return (
    <div className='mainAppContainer'>
      <div className='mainApp'>
        <h2>Hello, {user.username}</h2>
        {data.fetchVerifications.map(({ id, dateTime, appName }) => {
          return (
            <div className='verification' key={id}>
              <small>{dateTime}</small>
              <br></br>
              <strong>{appName}</strong>
              <br></br>
              <br></br>
              <button
                className='verifyButton'
                onClick={() => verify({ variables: { id } })}
              >
                Verify
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
