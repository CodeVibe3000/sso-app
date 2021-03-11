import express from "express"
import { ApolloServer } from "apollo-server-express"
import { importSchema } from "graphql-import"
import { mergeResolvers } from "@graphql-tools/merge"
import { join } from "path"

import { UserResolver } from "./controllers/user.controller"
import { VerifyResolver } from "./controllers/verify.controller"
import { createConnection } from "typeorm"

async function main() {
  const typeDefs = importSchema(join(__dirname, "typeDefs.graphql"))

  const resolvers = mergeResolvers([UserResolver, VerifyResolver])

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }: any) => ({ req, res }),
  })

  const app = express()
  server.applyMiddleware({ app })

  await createConnection()

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )
}
main()
