const { gql, GraphQLClient } = require("graphql-request")

const client = new GraphQLClient("http://localhost:4000/graphql")

const createVerification = async (userEmail, appName) => {
  var key = (
    await client.request(
      gql`
        mutation($userEmail: String, $appName: String) {
          createNewVerificationRequest(userEmail: $userEmail, appName: $appName)
        }
      `,
      { userEmail, appName }
    )
  ).createNewVerificationRequest
  return key
}

const fetchUserFromVerification = async (key) => {
  try {
    var res = await client.request(
      gql`
        query($key: Int) {
          fetchUserFromVerification(key: $key) {
            username
            email
          }
        }
      `,
      { key }
    )
    let user = res.fetchUserFromVerification
    return user
  } catch (_) {
    return null
  }
}

module.exports = {
  createVerification,
  fetchUserFromVerification,
}
