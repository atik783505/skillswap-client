import { headers } from "next/headers"
import { auth } from "../auth"

export const getSessionData = async () => {
    const data = await auth.api.getSession({
        headers: await headers()
    })
    return data?.user
}