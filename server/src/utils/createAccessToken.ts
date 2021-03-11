import { User } from "../models/User"
import { sign } from "jsonwebtoken"

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, "TOKEN_SECRET")
}
