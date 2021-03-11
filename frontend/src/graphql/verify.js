import { gql } from "@apollo/client"

export const verifyMutation = gql`
  mutation($id: Int) {
    verify(id: $id)
  }
`
