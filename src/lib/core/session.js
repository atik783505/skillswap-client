import { headers } from "next/headers"
import { auth } from "../auth"

export const getSessionData = async () => {
    const data = await auth.api.getSession({
        headers: await headers()
    })
    return data?.user
}

export const getToken = async()=>{
  const token = await auth.api.getToken({
    headers: await headers(),
  });
  return token ? token.token : {}
}