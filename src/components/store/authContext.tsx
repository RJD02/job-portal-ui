import { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from 'react'

type User = {
    username: string,
    token?: string,
    email: string,
    password?: string
}

type UserContext = {
    user: User,
    login: (user: User) => Promise<boolean>,
    logout: () => void,
    signup: (user: User) => Promise<boolean>,
    isAuthenticated: boolean,
    isLoading: boolean
    token: string
}

export type Response = {
    data: any,
    error: string,
    message: string,
    statuscode: number
}

const AuthContext = createContext<UserContext | null>(null)


export const AuthProvider = (props: { children: ReactNode }) => {
    const [user, setUser] = useState<User>({
        username: "",
        token: "",
        email: ""
    })
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [userToken, setUserToken] = useState<string>("")

    const login = async (userData: User): Promise<boolean> => {
        setIsLoading(true)
        if (!userData.password) {

            console.log("Password is missing")
            setIsLoading(false)
            return false
        }

        try {

            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(userData)
            })

            if (!response.ok) {
                setIsLoading(false)
                throw new Error('Login failed')
            }

            const res: Response = await response.json()
            console.log(res)

            if (res.statuscode === 400) {
                console.log(res.message)
            }

            const token = res.data.token

            setUserToken(token)

            localStorage.setItem('token', token)

            setUser(userData)
            setIsAuthenticated(!!token)
            setIsLoading(false)

            return true
        } catch (e) {
            console.log(e)
            setIsLoading(false)
            return false
        }
    }

    const signup = async (userData: User): Promise<boolean> => {
        setIsLoading(true)
        try {
            if (!userData.password) {
                console.log("Password is missing")
                setIsLoading(false)
                return false;
            }

            const response = await fetch('http://localhost:5000/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(userData)
            })

            if (!response.ok) {
                setIsLoading(false)
                throw new Error('Signup failed')
            }

            const res: Response = await response.json()
            console.log(res)
            const token = res.data?.token
            setUserToken(token)
            localStorage.setItem('token', token)
            setUser(userData)
            setIsAuthenticated(!!token)
        } catch (e) {
            console.log(e)
            return false

        }
        setIsLoading(false)
        return true

    }

    const logout = () => {
        setUser({
            username: "",
            token: "",
            email: ""
        })
    }

    useEffect(() => {
        setIsLoading(true)
        const token = localStorage.getItem('token')
        console.log('Token is set', !!token)
        setIsAuthenticated(!!token)
        setUserToken(token ? token : "")
        setIsLoading(false)
    }, [])

    return (
        <AuthContext.Provider value={{ token: userToken, user, signup, login, logout, isLoading, isAuthenticated }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
