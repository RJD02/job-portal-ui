import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './components/store/authContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <App />
    </AuthProvider>
)
