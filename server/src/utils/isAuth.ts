import { verify } from "jsonwebtoken"
import { Request } from "express"
import { User } from "../models/User"

export const protect = (resolver: any) => {
  return async (_: any, args: any, { req }: { req: Request }) => {
    const authorization = req.headers["authorization"]

    let user

    if (!authorization) {
      throw new Error("not authenticated")
    }

    try {
      const token = authorization.split(" ")[1]
      const payload = verify(token, "TOKEN_SECRET") as { userId: number }
      user = User.findOne({ id: payload.userId })
    } catch (err) {
      throw new Error("not authenticated")
    }

    return await resolver(args, user)
  }
}
