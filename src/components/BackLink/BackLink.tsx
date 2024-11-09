import { useNavigate } from 'react-router-dom'

export default function BackLink() {
    const navigate = useNavigate()
    const handleBack = () => {
        navigate(-1)
    }
    return (
        <button onClick={handleBack} className="text-blue-500 hover:text-blue-700 font-semibold">
            ← Back
        </button>
    )
}

