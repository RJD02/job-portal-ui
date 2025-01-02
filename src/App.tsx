import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Home from './pages/Home'
import Jobs from './pages/job/Jobs'
import Job from './pages/job/Job'
import Auth from './pages/Auth/Auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import ProtectedRoute from './components/Protected/Protected'
import { useAuth } from './components/store/authContext'
import AddJobPage from './pages/AddJob/AddJob'

function App() {
    const ctx = useAuth()


    const router = createBrowserRouter([
        {
            'path': '/',
            element: <Jobs />
        }, {
            path: '/auth/:type',
            element: <Auth />
        },
        {
            path: '/jobs/:id',
            element: <Job />

        }, {
            path: '/jobs',
            element: <Jobs />
        },
        {
            path: '/add-job',
            element: <ProtectedRoute component={AddJobPage} />
        }
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
