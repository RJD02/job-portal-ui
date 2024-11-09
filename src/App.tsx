import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Jobs from './pages/job/Jobs'
import Job from './pages/job/Job'
import Auth from './pages/Auth/Auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import ProtectedRoute from './components/Protected/Protected'
import { useAuth } from './components/store/authContext'

function App() {
    const ctx = useAuth()


    const router = createBrowserRouter([
        {
            'path': '/',
            element: <Home />
        }, {
            path: '/auth/:type',
            element: <Auth />
        },
        {
            path: '/jobs/:id',
            element: <ProtectedRoute component={Job} />

        }, {
            path: '/jobs',
            element: <ProtectedRoute component={Jobs} />
        },
    ])

    if (ctx?.isLoading) {
        return <p>Loading...</p>
    }

    return (

        <div className='mx-12 py-4'>
            <RouterProvider router={router} />

            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='colored'
            />
        </ div>
    )
}

export default App
