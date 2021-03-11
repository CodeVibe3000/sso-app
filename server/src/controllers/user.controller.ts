import { compare, hash } from "bcryptjs"
import { User } from "../models/User"
import { createAccessToken } from "../utils/createAccessToken"
import { protect } from "../utils/isAuth"

class LoginResponse {
  accessToken: string
  user: User
}

class UserController {
  static me = protect(async (_: any, payload: any) => {
    return payload
  })

  static async register(
    _: any,
    {
      email,
      username,
      password,
    }: { username: string; email: string; password: string }
  ): Promise<Boolean> {
    const hashedPassword = await hash(password, 12)

    try {
      await User.insert({
        email,
        username,
        password: hashedPassword,
      })
    } catch (err) {
      console.log(err)
      return false
    }

    return true
  }

  static async login(
    _: any,
    { email, password }: { email: string; password: string }
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      throw new Error("could not find user")
    }

    const valid = await compare(password, user.password)

    if (!valid) {
      throw new Error("bad password")
    }

    return {
      accessToken: createAccessToken(user),
      user,
    }
  }
}

export const UserResolver = {
  Mutation: {
    register: UserController.register,
    login: UserController.login,
  },
  Query: {
    me: UserController.me,
    hello: () => "hello world",
  },
}
