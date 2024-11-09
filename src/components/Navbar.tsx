import { Button } from "./Button/Button";
import { Link } from 'react-router-dom'
import { useAuth } from "./store/authContext";

export default function Navbar() {
    const authCtx = useAuth()
    return (
        <nav className='flex justify-between w-100 align-center text-center'>
            <h1 className='text-3xl font-bold'><a href='/'>Job Portal</a></h1>
            {authCtx?.isAuthenticated ? <div className="links flex space-x-4 md:space-x-5 ">
                <Link to='/jobs' > <Button>Jobs</Button></Link>
            </div> :
                <div className="links flex space-x-4 md:space-x-5 ">
                    <Link to="/auth/login" ><Button>Log in</Button></Link>
                    <Link to="/auth/signup" ><Button invariant="white">Sign up</Button></Link>
                </div>
            }
        </nav>
    )
}

