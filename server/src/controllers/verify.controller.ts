import { User } from "../models/User"
import { VerificationRequest } from "../models/VerificationRequest"
import { protect } from "../utils/isAuth"

import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo("en-US")

class VerifyController {
  static async createNewVerificationRequest(
    _: any,
    { userEmail, appName }: { userEmail: string; appName: string }
  ): Promise<number> {
    const data = {
      userEmail,
      appName,
      dateTime: new Date().toUTCString(),
    }
    await VerificationRequest.insert(data)
    return (await VerificationRequest.findOne(data))!.id
  }

  static async fetchVerifications(_: any, payload: Promise<User>) {
    return (
      await VerificationRequest.find({
        userEmail: (await payload).email,
        verified: false,
      })
    ).map((verification) => ({
      ...verification,
      dateTime: timeAgo.format(new Date(verification.dateTime), "round"),
    }))
  }

  static async fetchUserFromVerification(
    _: any,
    { key }: { key: number }
  ): Promise<User> {
    const requests = await VerificationRequest.find({
      id: key,
      verified: true,
    })
    if (requests.length == 0) {
      throw new Error("Verification Not Verified")
    }
    const userEmail = requests[0].userEmail

    const user = await User.findOne({ email: userEmail })
    return user!
  }

  static async verify(
    { id }: { id: number },
    payload: Promise<User>
  ): Promise<Boolean> {
    var requests = await VerificationRequest.find({
      id,
      userEmail: (await payload).email,
    })
    if (requests.length == 0) {
      throw new Error("Failed to find request")
    } else {
      await VerificationRequest.update(id, {
        verified: true,
      })
    }
    return true
  }
}

export const VerifyResolver = {
  Mutation: {
    createNewVerificationRequest: VerifyController.createNewVerificationRequest,
    verify: protect(VerifyController.verify),
  },
  Query: {
    fetchVerifications: protect(VerifyController.fetchVerifications),
    fetchUserFromVerification: VerifyController.fetchUserFromVerification,
  },
}
