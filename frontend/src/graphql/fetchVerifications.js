import { gql } from "@apollo/client"

export const fetchVerifications = gql`
  {
    fetchVerifications {
      id
      verified
      userEmail
      dateTime
      appName
    }
  }
`
