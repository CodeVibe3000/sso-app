import { gql } from "@apollo/client"

export const registerMutation = gql`
  mutation($email: String, $username: String, $password: String) {
    register(email: $email, username: $username, password: $password)
  }
`

export const loginMutation = gql`
  mutation($email: String, $password: String) {
    login(email: $email, password: $password) {
      accessToken
      user {
        id
        username
        email
      }
    }
  }
`
