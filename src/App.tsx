import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {

  const router = createBrowserRouter([
  {
    'path': '/',
    element: <Home />
  }

  ])

  return (
    <>
    <Navbar />
    <RouterProvider router={router} />
    </>
  )
}

export default App
