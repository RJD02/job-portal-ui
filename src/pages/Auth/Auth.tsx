import { FormEvent, ReactNode, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../components/store/authContext"
import { toast } from "react-toastify"


const Signup = () => {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [submitPressed, setSubmitPressed] = useState<boolean>(false)
    const authContext = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        const performSignup = async () => {
            if (!authContext) return
            try {
                const res = await authContext.signup({
                    username,
                    password,
                    email
                })

                console.log('Res is', res)
                if (res) {
                    toast.success('Signup successfull')
                    navigate('/jobs')
                }
            }
            catch (e) {
                console.log(e)
            } finally {
                setSubmitPressed(false)
            }
        }
        if (submitPressed) {
            performSignup()
        }
    }, [submitPressed])
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitPressed(true)
        console.log("Signing up with:", { username, password, email })
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md border-4">
                <h2 className="text-2xl font-bold text-center text-black">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-black"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-black"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-black"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-gray-600">
                    Already have an account? <a href="/auth/login" className="text-black font-semibold">Log in</a>
                </p>
            </div>
        </div>
    )
}

const Login = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [submitClicked, setSubmitClicked] = useState<boolean>(false)
    const authContext = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        const performLogin = async () => {
            try {
                const successfull = await authContext?.login({
                    username, password, email
                })
                if (successfull) {
                    toast.success('Login successful')
                    navigate('/jobs')
                }
                else {
                    toast.warn('Login failed')
                }
            } catch (e) {
                console.log('Login failed')
                console.log(e)
            } finally {
                setSubmitClicked(false)
            }

        }
        if (submitClicked) {
            performLogin()
        }
    }, [submitClicked])
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (username === "" && email === "") {
            console.log("Both username and email are not filled")
            return;
        }
        setSubmitClicked(true)
        console.log("Logging with: ", { username, password })
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 rounded-sm">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md border-2">
                <h2 className="text-2xl font-bold text-center text-black">Login with username or email</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-black"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-black"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-black"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 transition duration-200"
                    >
                        Log In
                    </button>
                </form>
                <p className="text-center text-gray-600">
                    Don't have an account? <a href="/auth/signup" className="text-black font-semibold">Sign up</a>
                </p>
            </div>
        </div>
    )
}

const Incorrect = () => {
    return (
        <div>Incorrect url</div>
    )
}

export default function Auth() {
    const { type } = useParams<{ type: string }>();
    let component: ReactNode
    console.log("type = ", type)
    if (type == undefined) {
        return <div>Incorrect URL</div>
    }
    else if (type.toLowerCase() === 'signup')
        component = Signup()
    else if (type.toLowerCase() === 'login')
        component = Login()
    else
        component = Incorrect()

    return (
        <div>
            {component}
        </div>

    )
}

