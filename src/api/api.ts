import { redirect } from "react-router-dom"
import { useAuth } from "../components/store/authContext"
import { useState } from "react"

export const serverFetch = async (url: string, options: { headers?: {}, method: string } = { method: "GET" }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const ctx = useAuth()
    if (!ctx) return
    const headers = {
        ...options?.headers,
        'Autherization': `Bearer ${ctx.token}`
    }
    console.log(isLoading)
    const response = await fetch(url, {

        method: options.method,
        headers
    })

    if (response.status === 401) {
        redirect('/auth/login')
    }
    setIsLoading(false)
}
