import { Button } from "./Button/Button";
import { useAuth } from "./store/authContext";

export default function Navbar() {
    const authCtx = useAuth()
    return (
        <nav className='flex justify-between w-100 align-center text-center'>
            <h1 className='text-3xl font-bold'><a href='/'>Job Portal</a></h1>
            {authCtx?.isAuthenticated ? <div className="links flex space-x-4 md:space-x-5 ">
                <a href='/jobs' > <Button>Jobs</Button></a>
            </div> :
                <div className="links flex space-x-4 md:space-x-5 ">
                    <a href="/auth/login" ><Button>Log in</Button></a>
                    <a href="/auth/signup" ><Button invariant="white">Sign up</Button></a>
                </div>
            }
        </nav>
    )
}

